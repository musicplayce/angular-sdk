import { TestBed, getTestBed } from '@angular/core/testing'

import { PlaylistsService } from './playlists.service'
import {
    HttpTestingController,
    HttpClientTestingModule
} from '@angular/common/http/testing'
import { AngularSdkModule } from '../angular-sdk.module'

describe('PlaylistsService', () => {
    let injector: TestBed
    let service: PlaylistsService
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
            providers: [PlaylistsService]
        })
        injector = getTestBed()
        service = injector.get(PlaylistsService)
        httpMock = injector.get(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
