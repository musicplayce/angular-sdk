import { Injectable, Inject } from '@angular/core'
import { Observable } from 'rxjs'
import { PlaylistModel } from '../models/playlists.model'
import { BASE_URL } from '../angular-sdk.module'
import { CacheHttpService } from './cachehttp.service'
import { environment } from '../../environments/environment'
import { CursorModel } from '../models/cursor.model'
import { HttpParams } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class PlaylistsService {
    public BASE_URL: string

    private API_PLAYLISTS: string

    constructor(
        @Inject(BASE_URL) base_url_injected: string,
        private cacheHttp: CacheHttpService
    ) {
        this.BASE_URL = base_url_injected
        this.API_PLAYLISTS = base_url_injected + environment.PLAYLISTS
    }

    /**
     * Returns a specific playlist by its ID
     *
     * @param id the playlist's id
     * @param cursor the cursor to playlist's pagination
     * @param isPreviousPage if true return previous playlist's page
     * @return Observable<PlaylistModel> as new observable of the playlist
     */
    public retrieve(
        id: string,
        timeout: number = 0,
        cursor?: CursorModel,
        isPreviousPage?: boolean
    ): Observable<PlaylistModel> {
        let params = new HttpParams().set(
            'next',
            cursor != null && cursor.next != null && !(isPreviousPage || null)
                ? cursor.next
                : cursor != null &&
                  cursor.previous != null &&
                  (isPreviousPage || null)
                ? cursor.previous
                : ''
        )
        return this.cacheHttp.get<PlaylistModel>(
            this.API_PLAYLISTS + '/' + id + '?' + params.toString(),
            timeout
        )
    }
}
