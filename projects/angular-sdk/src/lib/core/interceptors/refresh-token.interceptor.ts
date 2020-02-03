import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "../service/auth.service";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { tap, map, catchError, switchMap, filter, take } from "rxjs/operators";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(public authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.getAccessToken()) {
      request = this.addAccessToken(request, this.authService.getAccessToken());
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next, error);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler,
    err: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((resp: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(resp.jwt.token);
          return next.handle(this.addAccessToken(request, resp.jwt.token));
        }),
        catchError(() => {
          return throwError(err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(resp => resp != null),
        take(1),
        switchMap(resp => {
          return next.handle(this.addAccessToken(request, resp.jwt.token));
        }),
        catchError(() => {
          return throwError(err);
        })
      );
    }
  }

  private addAccessToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
