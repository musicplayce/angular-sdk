import { TestBed, getTestBed } from '@angular/core/testing'

import { PostsService } from './posts.service'
import {
    HttpTestingController,
    HttpClientTestingModule
} from '@angular/common/http/testing'

import { AngularSdkModule } from '../angular-sdk.module'

describe('PostsService', () => {
    let injector: TestBed
    let service: PostsService
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
            providers: [PostsService]
        })
        injector = getTestBed()
        service = injector.get(PostsService)
        httpMock = injector.get(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
