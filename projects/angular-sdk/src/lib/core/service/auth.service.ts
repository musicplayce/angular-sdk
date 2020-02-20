import { Injectable, Inject } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpRequest, HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { ResetSendModel } from './models/reset.send.model'
import { UserAuth } from './models/user.auth.model'
import { SpotifyAuth } from './models/spotify.auth.model'
import { AuthResponse } from './models/auth.response.model'
import { ApiRequest, DataRequest } from './models/request.base.model'
import { environment } from '../../../environments/environment'
import { RefreshSendModel } from './models/refresh.send.model'
import { CookieUtil } from '../util/cookie.util'
import { encode } from 'utf8'
import { sha256 } from 'js-sha256'
import { tap, concatMap, map, catchError } from 'rxjs/operators'

import { BASE_URL, COOKIE_DOMAIN } from '../../angular-sdk.module'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    cachedRequests: Array<HttpRequest<any>> = []
    jwtHelper = new JwtHelperService()
    public BASE_URL: string
    public COOKIE_DOMAIN: string

    API_SIGNUP = environment.SIGNUP
    API_SIGNIN = environment.SIGNIN
    API_SIGNOUT = environment.SIGNOUT
    API_REFRESH = environment.REFRESH
    API_FORGOT = environment.FORGOT
    API_VALIDATE_TOKEN = environment.VALIDATE_TOKEN
    API_RESET_PASSWORD = environment.RESET_PASSWORD
    API_VERIFY_SIGNUP_TOKEN = environment.VERIFY_SIGNUP_TOKEN
    API_SIGNIN_SPOTIFY = environment.SIGNIN_SPOTIFY
    SPOTIFY_REDIRECT_URI = environment.SPOTIFY_REDIRECT_URI

    constructor(
        @Inject(BASE_URL) base_url_injected: string,
        @Inject(COOKIE_DOMAIN) cookie_domain: string,
        private http: HttpClient
    ) {
        this.BASE_URL = base_url_injected
        this.COOKIE_DOMAIN = cookie_domain
    }

    public setAccessToken(token: string): void {
        localStorage.setItem('access-token', token)
        CookieUtil.createCookie(
            'access-token',
            token,
            1,
            0,
            this.COOKIE_DOMAIN,
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
            this.COOKIE_DOMAIN,
            environment.COOKIE_SECURE
        )
    }

    public getRefreshToken(): string {
        const refresh_token = CookieUtil.readCookie('refresh-token')
        return refresh_token
    }

    /**
     * Returns logged user's id
     */
    public getUserId(): string {
        return localStorage.getItem('iss')
    }

    /**
     * Set logged user's id
     *
     * @param userId user's id
     */
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

    /**
     * Return an observable of boolean value which means if refresh token expired
     */
    public isAuthenticated(): Observable<boolean> {
        // get the token
        const refresh_token = this.getRefreshToken()
        // return a boolean reflecting
        // whether or not the token is expired
        return new Observable<boolean>(subscriber => {
            subscriber.next(!this.jwtHelper.isTokenExpired(refresh_token))
        }).pipe(
            tap((val: boolean) => {
                if (!val) throw 'Internal expired'
            }),
            concatMap(() =>
                this.verifyToken('validate', this.getRefreshToken()).pipe(
                    map(() => true)
                )
            ),
            catchError(() => of(false))
        )
    }

    /**
     * Returns with tokens from a new authentication
     *
     * @param user has username and password not encrypted
     * @returns Observable<AuthResponse> an observable with tokens in AuthResponse model message
     */
    public login(user: UserAuth): Observable<AuthResponse> {
        let passEncode = sha256(user.password)
        user.password = passEncode.toString()
        let body = new ApiRequest()

        body.data = new DataRequest()
        body.data.attributes = user

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

    /**
     * Returns with tokens from a new authentication
     *
     * @param credentials has code redirect_url and device_token
     * @returns Observable<AuthResponse> an observable with tokens in AuthResponse model message
     */
    public loginSpotify(credentials: SpotifyAuth): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(
                this.BASE_URL + this.API_SIGNIN_SPOTIFY,
                credentials
            )
            .pipe(
                tap(resp => {
                    this.setRefreshToken(resp.jwt.refresh_token)
                    this.setAccessToken(resp.jwt.token)
                })
            )
    }

    /**
     * Returns AuthResponse with tokens and iss whether user have been created.
     *
     * @param name required
     * @param email required
     * @param password required without encrypted
     * @param accepted_policy optional
     * @param accepted_terms optional
     */
    public signup(
        name: string,
        email: string,
        password: string,
        accepted_policy?: number,
        accepted_terms?: number
    ): Observable<AuthResponse> {
        let passEncode = sha256(password)
        password = passEncode.toString()

        let params = {
            name,
            email,
            password,
            accepted_policy,
            accepted_terms
        }

        return this.http
            .post<AuthResponse>(this.BASE_URL + this.API_SIGNUP, params)
            .pipe(
                tap(resp => {
                    this.setRefreshToken(resp.jwt.refresh_token)
                    this.setAccessToken(resp.jwt.token)
                })
            )
    }

    /**
     * Returns a successfully message if email was sent
     *
     * @param email of profile who wants recovery password
     * @returns success message
     */
    public recoveryRequest(email: string): any {
        return this.http.post(this.BASE_URL + this.API_FORGOT, email, {
            responseType: 'text'
        })
    }

    /**
     * Return successfully message whether token is valid
     *
     * @param origin checking's type
     * @param token access token
     */
    public verifyToken(origin: string, token: string): Observable<string> {
        if (origin == 'validate') {
            //this.setAccessToken(token)
            return this.http.get(
                this.BASE_URL + this.API_VALIDATE_TOKEN + '/' + token,
                {
                    responseType: 'text'
                }
            )
        }

        if (origin == 'verify') {
            return this.http.get(this.API_VERIFY_SIGNUP_TOKEN + '/' + token, {
                responseType: 'text'
            })
        }
    }

    /**
     * Returns a successfully message if password can be modified
     *
     * @param password new password for forwarding authentication
     * @returns any message of success
     */
    public resetPassword(password: string): any {
        let token = this.getAccessToken()

        return this.http.post(
            this.BASE_URL + this.API_RESET_PASSWORD + '/' + token,
            { password: password },
            { responseType: 'text' }
        )
    }

    /**
     * Should delete access and refresh token from cookies
     */
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

        if (this.getAccessToken()) {
            document.cookie =
                'access-token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[something];'
        }
        if (this.getRefreshToken()) {
            document.cookie =
                'refresh-token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[something];'
        }
    }

    /**
     * Return AuthResponse message with null values
     *
     * @returns Observable<AuthResponse> as an observable with null authresponse message
     */
    public signout(): Observable<AuthResponse> {
        return this.http
            .get<AuthResponse>(this.BASE_URL + this.API_SIGNOUT)
            .pipe(
                tap(resp => {
                    if (resp.jwt.iss == null && resp.jwt.token == null)
                        this.clearAllTokens()
                })
            )
    }

    /**
     * Returns a successfully message if email exists
     * @param email that will be sent a password recovery token
     */
    public forgot(email: string) {
        return this.http.post(this.BASE_URL + this.API_FORGOT, { email })
    }
}
