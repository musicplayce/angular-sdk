import { Injectable, Inject } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpRequest, HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { ResetSendModel } from './models/reset.send.model'
import { UserAuth } from './models/user.auth.model'
import { SpotifyAuth } from './models/spotify.auth.model'
import { AuthResponse } from './models/auth.response.model'
import { ApiRequest, DataRequest } from './models/request.base.model'
import { environment } from '../../../environments/environment'
import { RefreshSendModel } from './models/refresh.send.model'
import { CookieUtil } from '../util/cookie.util'
import { encode } from 'utf8'
import { SHA256 } from 'crypto-js'
import { tap } from 'rxjs/operators'

import { BASE_URL } from '../../angular-sdk.module'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    cachedRequests: Array<HttpRequest<any>> = []
    jwtHelper = new JwtHelperService()
    public BASE_URL: string
    API_SIGNIN = environment.SIGNIN
    API_SIGNOUT = environment.SIGNOUT
    API_REFRESH = environment.REFRESH
    API_FORGOT = environment.FORGOT
    API_VALIDATE_TOKEN = environment.VALIDATE_TOKEN
    API_RESET_PASSWORD = environment.RESET_PASSWORD
    API_VERIFY_SIGNUP_TOKEN = environment.VERIFY_SIGNUP_TOKEN
    API_SIGNIN_SPOTIFY = environment.SIGNIN_SPOTIFY
    COOKIE_DOMAIN = environment.COOKIE_DOMAIN
    constructor(
        @Inject(BASE_URL) base_url_injected: string,
        private http: HttpClient
    ) {
        this.BASE_URL = base_url_injected
    }

    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    )

    public collectFailedRequest(request): void {
        this.cachedRequests.push(request)
    }

    public retryFailedRequests(): void {
        // retry the requests. this method can
        // be called after the token is refreshed
    }

    public setAccessToken(token: string): void {
        localStorage.setItem('access-token', token)
        CookieUtil.createCookie(
            'access-token',
            token,
            1,
            0,
            environment.COOKIE_DOMAIN,
            environment.COOKIE_SECURE
        )
    }

    public getAccessToken(): string {
        const access_token = CookieUtil.readCookie('access-token')
        return access_token
    }

    public setRefreshToken(token: string): void {
        localStorage.setItem('refresh-token', token)
        CookieUtil.createCookie(
            'refresh-token',
            token,
            0,
            90,
            environment.COOKIE_DOMAIN,
            environment.COOKIE_SECURE
        )
    }

    public getRefreshToken(): string {
        const refresh_token = CookieUtil.readCookie('refresh-token')
        return refresh_token
    }

    public getUserId(): string {
        return localStorage.getItem('iss')
    }

    public setUserId(userId: string) {
        localStorage.setItem('iss', userId)
    }

    public refreshToken(): Observable<AuthResponse> {
        let body = new RefreshSendModel(this.getRefreshToken())
        return this.http
            .post<AuthResponse>(this.BASE_URL + this.API_REFRESH, body)
            .pipe(
                tap((resp: AuthResponse) => {
                    this.setAccessToken(resp.jwt.token)
                })
            )
    }

    public isAuthenticated(): boolean {
        // get the token
        const token = this.getAccessToken()
        // return a boolean reflecting
        // whether or not the token is expired
        this.isLoggedIn.next(!this.jwtHelper.isTokenExpired(token))
        return !this.jwtHelper.isTokenExpired(token)
    }

    /**
     * Returns with tokens from a new authentication
     *
     * @param user has username and password not encrypted
     * @returns {Observable<AuthResponse>} an observable with tokens in AuthResponse model message
     */
    public login(user: UserAuth): Observable<AuthResponse> {
        let passUtf8 = encode(user.password)
        let passEncode = SHA256(passUtf8)
        user.password = passEncode.toString()
        let body = new ApiRequest()

        body.data = new DataRequest()
        body.data.attributes = user

        console.log(user)

        return this.http
            .post<AuthResponse>(this.BASE_URL + this.API_SIGNIN, user)
            .pipe(
                tap(resp => {
                    this.setRefreshToken(resp.jwt.refresh_token)
                    this.setAccessToken(resp.jwt.token)
                    this.setUserId(resp.jwt.iss)
                })
            )
    }

    public loginSpotify(credentials: SpotifyAuth): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(BASE_URL + this.API_SIGNIN_SPOTIFY, credentials)
            .pipe(
                tap(resp => {
                    this.setRefreshToken(resp.jwt.refresh_token)
                    this.setAccessToken(resp.jwt.token)
                })
            )
    }

    public recoveryRequest(email: string): any {
        return this.http.post(BASE_URL + this.API_FORGOT, email, {
            responseType: 'text'
        })
    }

    public verifyToken(origin: string, token: string): any {
        //if(origin == "validate"){
        this.setAccessToken(token)
        return this.http.get(BASE_URL + this.API_VALIDATE_TOKEN + '/' + token, {
            responseType: 'text'
        })
        //}
        /*
         if ((origin = 'verify')) {
            return this.http.get(API_VERIFY_SIGNUP_TOKEN + '/' + token, {
                responseType: 'text'
            })
        } */
    }

    public resetPassword(password: string): any {
        let token = this.getAccessToken()

        return this.http.post(
            this.BASE_URL + this.API_RESET_PASSWORD + '/' + token,
            { password: password },
            { responseType: 'text' }
        )
    }
    public clearAllTokens() {
        CookieUtil.createCookie('access-token', '', 0, -120, this.COOKIE_DOMAIN)
        localStorage.setItem('access-token', '')
        CookieUtil.createCookie(
            'refresh-token',
            '',
            0,
            -120,
            this.COOKIE_DOMAIN
        )
        localStorage.setItem('refresh-token', '')
    }
    public signout(): Observable<AuthResponse> {
        return this.http
            .get<AuthResponse>(this.BASE_URL + this.API_SIGNOUT)
            .pipe(
                tap(resp => {
                    if (resp.jwt.iss == null || resp.jwt.token == null)
                        this.clearAllTokens()
                })
            )
    }
}
