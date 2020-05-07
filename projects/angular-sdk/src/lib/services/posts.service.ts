import { Injectable, Inject } from '@angular/core'
import { CacheHttpService } from './cachehttp.service'
import { BASE_URL } from '../angular-sdk.module'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'

import { PostListModel } from '../models/posts.model'
import { HttpClient, HttpParams } from '@angular/common/http'
import { CursorModel } from '../models/cursor.model'

const PAGE_SIZE = 6

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    public BASE_URL: string

    private API_POSTS: string
    private API_TAGS: string

    constructor(
        @Inject(BASE_URL) base_url_injected: string,
        private cacheHttp: CacheHttpService,
        private http: HttpClient
    ) {
        this.BASE_URL = base_url_injected
        this.API_POSTS = base_url_injected + environment.POSTS
        this.API_TAGS = base_url_injected + environment.TAGS
    }

    /**
     * Returns all posts by tags and artistis

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

    /**
     * Returns all posts indicated to a profile
     *
     * @param string id of profile
     * @param CursorModel cursor object of current page
     * @param boolean flag to indicate if get previous or next page
     * @return Observable<PostListModel> as new observable of a list of posts
     */
    getIndicatedTo(
        id_profile: string,
        cursor?: CursorModel,
        isPreviousPage?: boolean
    ): Observable<PostListModel> {
        let params = new HttpParams()
            .set('id_profile', id_profile)
            .set('limit', PAGE_SIZE.toString())
            .set(
                'next',
                cursor != null &&
                    cursor.next != null &&
                    !(isPreviousPage || null)
                    ? cursor.next
                    : cursor != null &&
                      cursor.previous != null &&
                      (isPreviousPage || null)
                    ? cursor.previous
                    : ''
            )

        return this.http.get<PostListModel>(
            `${this.API_POSTS}/indications/to`,
            { params: params }
        )
    }

    /**
     * Returns all posts that contain a tag
     *
     * @param string id of tag
     * @param CursorModel cursor object of current page
     * @param boolean flag to indicate if get previous or next page
     * @return Observable<PostListModel> as new observable of a list of posts
     */
    getByHashtagId(
        id_tag: string,
        cursor?: CursorModel,
        isPreviousPage?: boolean
    ): Observable<PostListModel> {
        let params = new HttpParams()
            .set('limit', PAGE_SIZE.toString())
            .set(
                'next',
                cursor != null &&
                    cursor.next != null &&
                    !(isPreviousPage || null)
                    ? cursor.next
                    : cursor != null &&
                      cursor.previous != null &&
                      (isPreviousPage || null)
                    ? cursor.previous
                    : ''
            )

        return this.http.get<PostListModel>(
            `${this.API_TAGS}/${id_tag}/posts`,
            {
                params: params
            }
        )
    }
}
