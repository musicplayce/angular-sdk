import { TestBed, getTestBed } from '@angular/core/testing'
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing'

import { AuthService } from './auth.service'
import { AngularSdkModule } from '../../angular-sdk.module'
import { AuthResponse } from 'angular-sdk/lib/core/service/models/auth.response.model'
import { UserAuth } from 'angular-sdk/public-api'

describe('AuthService', () => {
    let injector: TestBed
    let service: AuthService
    let httpMock: HttpTestingController

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
        const dummyAuthResponse: AuthResponse = {
            jwt: {
                iss: '1',
                token: '1',
                refresh_token: '1'
            }
        }

        const user: UserAuth = {
            username: 'test_user',
            password: 'test_pass'
        }

        service.login(user).subscribe(retrive => {
            expect(retrive).toEqual(dummyAuthResponse)
        })

        const request = httpMock.expectOne(
            `${service.BASE_URL}${service.API_SIGNIN}`
        )
        expect(request.request.method).toBe('POST')
        request.flush(dummyAuthResponse)
    })
})
