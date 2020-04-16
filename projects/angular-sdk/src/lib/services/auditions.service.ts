import { Injectable, Inject } from '@angular/core'
import { BASE_URL } from '../angular-sdk.module'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import {
    AuditionListModel,
    AuditionRetrieveModel,
    AuditionUpdateModel,
    AuditionCreateModel
} from '../models/audition.model'

import { Observable, defer } from 'rxjs'
import { publishReplay, refCount, take } from 'rxjs/operators'
import { CacheHttpService } from './cachehttp.service'

@Injectable({
    providedIn: 'root'
})
export class AuditionsService {
    public BASE_URL: string

    private API_AUDITIONS: string

    constructor(
        @Inject(BASE_URL) base_url_injected: string,
        private httpClient: HttpClient,
        private cacheHttp: CacheHttpService
    ) {
        this.BASE_URL = base_url_injected
        this.API_AUDITIONS = base_url_injected + environment.AUDITIONS
    }

    /**
     * Returns all auditions with resolved tags and artistis
     *
     * @param number limit size of page
     * @param string next is id_cursor of next page
     * @param number page is number of page of pagination
     * @return Observable<AuditionListModel> as new observable of a list of auditions
     */
    public list(
        limit?: number,
        next?: string,
        page?: number,
        timeout: number = 0
    ): Observable<AuditionListModel> {
        return this.cacheHttp.get<AuditionListModel>(
            `${this.API_AUDITIONS}?limit=${limit ? limit : ''}&next=${
                next ? next : ''
            }&page=${page ? page : ''}`,
            timeout
        )
    }

    /**
     * Returns a single resolved audition.
     *
     * @param string id of audition requested
     * @returns Observable<AuditionRetrieveModel> as new observable from a single audition
     */
    public retrieve(
        id: string,
        timeout: number = 0
    ): Observable<AuditionRetrieveModel> {
        return this.cacheHttp.get<AuditionRetrieveModel>(
            `${this.API_AUDITIONS}/${id}`,
            timeout
        )
    }

    /**
     * Create a audition
     * @param string body of audition
     * @returns Observable<AuditionRetrieveModel> as new observable from new audition
     */
    public create(
        body: AuditionCreateModel
    ): Observable<AuditionRetrieveModel> {
        return this.httpClient.post<AuditionRetrieveModel>(
            `${this.API_AUDITIONS}`,
            body
        )
    }

    /**
     * Updates an existing audition.
     *
     * @param string id of audition requested
     * @param AuditionUploadModel body contains all possible attributes changeable
     * @return Observable<AuditionRetrieveModel> as new observable from modificated audition
     */
    public update(
        id: String,
        body: AuditionUpdateModel
    ): Observable<AuditionRetrieveModel> {
        return this.httpClient.put<AuditionRetrieveModel>(
            `${this.API_AUDITIONS}/${id}`,
            body
        )
    }

    /**
     * Delete an existing audition
     * @param string id of audition requested
     * @return Observable<AuditionRetrieveModel> as new observable from deleted audition
     */
    public delete(id: String): Observable<AuditionRetrieveModel> {
        return this.httpClient.delete<AuditionRetrieveModel>(
            `${this.API_AUDITIONS}/${id}`
        )
    }

    /**
     * Attach a post to red playlist
     * @param string id of audition requested
     * @param string id_post of post
     * @return Observable<AuditionRetrieveModel> as new observable from attached playlist
     */
    public attachToRed(
        id: string,
        id_post: string
    ): Observable<AuditionRetrieveModel> {
        return this.httpClient.post<AuditionRetrieveModel>(
            `${this.API_AUDITIONS}/${id}/red`,
            {
                id_post
            }
        )
    }

    /**
     * Attach a post to yellow playlist
     * @param string id of audition requested
     * @param string id_post of post
     * @return Observable<AuditionRetrieveModel> as new observable from attached playlist
     */
    public attachToYellow(
        id: string,
        id_post: string
    ): Observable<AuditionRetrieveModel> {
        return this.httpClient.post<AuditionRetrieveModel>(
            `${this.API_AUDITIONS}/${id}/yellow`,
            {
                id_post
            }
        )
    }

    /**
     * Attach a post to green playlist
     * @param string id of audition requested
     * @param string id_post of post
     * @return Observable<AuditionRetrieveModel> as new observable from attached playlist
     */
    public attachToGreen(
        id: string,
        id_post: string
    ): Observable<AuditionRetrieveModel> {
        return this.httpClient.post<AuditionRetrieveModel>(
            `${this.API_AUDITIONS}/${id}/green`,
            {
                id_post
            }
        )
    }

    /**
     * Attach a post to unclassified playlist
     * @param string id of audition requested
     * @param string id_post of post
     * @return Observable<AuditionRetrieveModel> as new observable from attached playlist
     */
    public attachToUnclassified(
        id: string,
        id_post: string
    ): Observable<AuditionRetrieveModel> {
        return this.httpClient.post<AuditionRetrieveModel>(
            `${this.API_AUDITIONS}/${id}/unclassified`,
            {
                id_post
            }
        )
    }
}
