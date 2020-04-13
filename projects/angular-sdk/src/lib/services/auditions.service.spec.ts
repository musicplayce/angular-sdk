import { TestBed, getTestBed } from '@angular/core/testing'

import { AuditionsService } from './auditions.service'
import {
    HttpTestingController,
    HttpClientTestingModule
} from '@angular/common/http/testing'

import { AngularSdkModule } from '../angular-sdk.module'

describe('AuditionsService', () => {
    let injector: TestBed
    let service: AuditionsService
    let httpMock: HttpTestingController
    beforeEach(() => TestBed.configureTestingModule({}))

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
            providers: [AuditionsService]
        })
        injector = getTestBed()
        service = injector.get(AuditionsService)
        httpMock = injector.get(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
