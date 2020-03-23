import { TestBed, getTestBed } from '@angular/core/testing'

import { SubscriptionsService } from './subscriptions.service'
import {
    HttpTestingController,
    HttpClientTestingModule
} from '@angular/common/http/testing'
import { AngularSdkModule } from '../angular-sdk.module'

describe('SubscriptionsService', () => {
    let injector: TestBed
    let service: SubscriptionsService
    let httpMock: HttpTestingController

    const iss = '542d3215a13451a123'
    const access_token: string = 'e12125da1123112uyt132132123132115dfa'
    const refresh_token: string = 'e12125da1123112uyt132132123132115dfa'
    const email: string = 'jobs@musicplayce.com'

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                AngularSdkModule.forRoot(
                    'https://api-beta.musicplayce.com',
                    'localhost',
                    'http://localhost:4200/auth/spotify'
                )
            ],
            providers: [SubscriptionsService]
        })
        injector = getTestBed()
        service = injector.get(SubscriptionsService)
        httpMock = injector.get(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
