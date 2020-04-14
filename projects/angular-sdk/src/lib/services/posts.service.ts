import { Injectable, Inject } from '@angular/core'
import { CacheHttpService } from './cachehttp.service'
import { BASE_URL } from '../angular-sdk.module'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'

import { PostListModel } from '../models/posts.model'

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    public BASE_URL: string

    private API_POSTS: string

    constructor(
        @Inject(BASE_URL) base_url_injected: string,
        private cacheHttp: CacheHttpService
    ) {
        this.BASE_URL = base_url_injected
        this.API_POSTS = base_url_injected + environment.POSTS
    }

    /**
     * Returns all posts by tags and artistis
     *
     * @param array of string for id_tags
     * @param array of string for id_artists (id_profile)
     * @param number limit size of page
     * @param string next is id_cursor (id_post) of next page
     * @return Observable<PostListModel> as new observable of a list of posts
     */
    public filter(
        id_tags: string[],
        id_artists: string[],
        limit?: number,
        next?: string,
        timeout?: number
    ): Observable<PostListModel> {
        let _id_tags = id_tags.join('|')
        let _id_artists = id_artists.join('|')

        return this.cacheHttp.get<PostListModel>(
            `${
                this.API_POSTS
            }?id_tags=${_id_tags}&id_artists=${_id_artists}&limit=${
                limit ? limit : ''
            }&next=${next ? next : ''}`,
            timeout
        )
    }
}
