import { Injectable, Inject } from '@angular/core'
import { Observable } from 'rxjs'
import { PlaylistModel } from '../models/playlists.model'
import { BASE_URL } from '../angular-sdk.module'
import { CacheHttpService } from './cachehttp.service'
import { environment } from '../../environments/environment'

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
     * @return Observable<PlaylistModel> as new observable of the playlist
     */
    public retrieve(
        id: string,
        timeout: number = 0
    ): Observable<PlaylistModel> {
        return this.cacheHttp.get<PlaylistModel>(
            this.API_PLAYLISTS + '/' + id,
            timeout
        )
    }
}
