import { TestBed, getTestBed } from '@angular/core/testing'
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing'

import { AuthService } from './auth.service'
import { AngularSdkModule } from '../../angular-sdk.module'
import { AuthResponse } from 'angular-sdk/lib/core/service/models/auth.response.model'
import { UserAuth } from 'angular-sdk/public-api'
import { SpotifyAuth } from 'angular-sdk/lib/core/service/models/spotify.auth.model'

describe('AuthService', () => {
    let injector: TestBed
    let service: AuthService
    let httpMock: HttpTestingController

    const iss = '542d3215a13451a123'
    const access_token: string = 'e12125da1123112uyt132132123132115dfa'
    const refresh_token: string = 'e12125da1123112uyt132132123132115dfa'

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                AngularSdkModule.forRoot('test')
            ],
            providers: [AuthService]
        })
        injector = getTestBed()
        service = injector.get(AuthService)
        httpMock = injector.get(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('#login should return jwt tokens', () => {
        service.setAccessToken('')
        service.setRefreshToken('')
        const dummyAuthResponse: AuthResponse = {
            jwt: {
                iss: iss,
                token: access_token,
                refresh_token: refresh_token
            }
        }

        const user: UserAuth = {
            username: 'test_user',
            password: 'test_pass'
        }

        service.login(user).subscribe(retrive => {
            expect(retrive).toEqual(dummyAuthResponse)
            expect(service.getAccessToken()).toBe(access_token)
            expect(service.getRefreshToken()).toBe(refresh_token)
        })

        const request = httpMock.expectOne(
            `${service.BASE_URL}${service.API_SIGNIN}`
        )
        expect(request.request.method).toBe('POST')
        request.flush(dummyAuthResponse)
    })

    it('#loginSpotify should return jwt tokens', () => {
        service.setAccessToken('')
        service.setRefreshToken('')
        const dummyAuthResponse: AuthResponse = {
            jwt: {
                iss: iss,
                token: access_token,
                refresh_token: refresh_token
            }
        }

        const credentials: SpotifyAuth = {
            code: '1',
            redirect_uri: `${service.SPOTIFY_REDIRECT_URI}`,
            device_token: '1'
        }

        service.loginSpotify(credentials).subscribe(retrive => {
            expect(retrive).toEqual(dummyAuthResponse)
            expect(service.getAccessToken()).toBe(access_token)
            expect(service.getRefreshToken()).toBe(refresh_token)
        })
        const request = httpMock.expectOne(
            service.BASE_URL + service.API_SIGNIN_SPOTIFY
        )
        expect(request.request.method).toBe('POST')
        request.flush(dummyAuthResponse)
    })

    it('#recoveryRequest should return success message', () => {
        const dummyMessage: string = '{"message":"Email successfully sent"}'

        const email: string = 'jobs@musicplayce.com'

        service.recoveryRequest(email).subscribe(retrive => {
            expect(retrive).toBe(dummyMessage)
        })

        const request = httpMock.expectOne(
            service.BASE_URL + service.API_FORGOT
        )
        expect(request.request.method).toBe('POST')
        request.flush(dummyMessage)
    })

    it('#resetPassword should return success message', () => {
        const dummyMessage: string = '{"message":"Password successfully sent"}'

        const password: string = 'user_password'

        service.resetPassword(password).subscribe(retrive => {
            expect(retrive).toBe(dummyMessage)
        })

        const request = httpMock.expectOne(
            service.BASE_URL + service.API_RESET_PASSWORD + '/' + access_token
        )
        expect(request.request.method).toBe('POST')
        request.flush(dummyMessage)
    })

    it('#clearAllTokens should clear all tokens', () => {
        service.setAccessToken(access_token)
        service.setRefreshToken(refresh_token)
        service.clearAllTokens()
        expect(service.getAccessToken()).toBeNull()
        expect(service.getRefreshToken()).toBeNull()
        service.setAccessToken(access_token)
        service.setRefreshToken(refresh_token)
    })

    it('#signout should retrive null authresponse values', () => {
        service.setAccessToken(access_token)
        service.setRefreshToken(refresh_token)

        const dummyAuthResponse: AuthResponse = {
            jwt: {
                iss: null,
                token: null
            }
        }

        service.signout().subscribe(retrive => {
            expect(retrive).toEqual(dummyAuthResponse)
            expect(service.getAccessToken()).toBeNull()
            expect(service.getRefreshToken()).toBeNull()
        })

        const request = httpMock.expectOne(
            service.BASE_URL + service.API_SIGNOUT
        )
        expect(request.request.method).toBe('GET')
        request.flush(dummyAuthResponse)
        service.setAccessToken(access_token)
        service.setRefreshToken(refresh_token)
    })
})