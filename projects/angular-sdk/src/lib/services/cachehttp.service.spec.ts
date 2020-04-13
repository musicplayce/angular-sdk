import { TestBed, getTestBed } from '@angular/core/testing'

import { CacheHttpService } from './cachehttp.service'
import {
    HttpTestingController,
    HttpClientTestingModule
} from '@angular/common/http/testing'
import { AngularSdkModule } from '../angular-sdk.module'

describe('CacheHttpService', () => {
    let injector: TestBed
    let service: CacheHttpService
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
            providers: [CacheHttpService]
        })
        injector = getTestBed()
        service = injector.get(CacheHttpService)
        httpMock = injector.get(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
