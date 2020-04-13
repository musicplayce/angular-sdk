import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
    UserListModel,
    UserRetriveModel,
    UserUploadModel,
    UserListLikesModel,
    UserListIndicationsModel,
    UserCreateFollowModel,
    UserDeleteFollowModel,
    UserListPlaylistsModel,
    UserSubscriptionModel
} from '../models/user.model'
import { Observable, defer } from 'rxjs'
import { publishReplay, refCount, take } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
/**
 * Persist CRUD tasks and others associated with users' service.
 *
 * @class UsersService
 */
export class UsersService {
    public USERS_URL: string = 'https://api-beta.musicplayce.com/v1/users'

    constructor(private http: HttpClient) {}

    /**
     * Returns all profiles with resolved pictures and roles.
     *
     * @param {number} limit size of page
     * @param {string} next is id_cursor of next page
     * @param {number} page is number of page of pagination
     * @return {Observable<UserListModel>} as new observable of a list of profiles
     */
    public list(
        limit?: number,
        next?: string,
        page?: number
    ): Observable<UserListModel> {
        return this.http.get<UserListModel>(
            `${this.USERS_URL}?limit=${limit ? limit : ''}&next=${
                next ? next : ''
            }&page=${page ? page : ''}`
        )
    }

    private retrive$(id: string): Observable<UserRetriveModel> {
        return defer(() =>
            this.http.get<UserRetriveModel>(`${this.USERS_URL}/${id}`)
        ).pipe(publishReplay(1, 1000), refCount(), take(1))
    }

    /**
     * Returns a single resolved profile.
     *
     * @param {string} id of profile requested
     * @returns {Observable<UserRetriveModel>} as new observable from a single profile
     */
    public retrive(id: string): Observable<UserRetriveModel> {
        return this.retrive$(id)
    }

    /**
     * Updates an existing profile.
     *
     * @param {string} id of profile requested
     * @param {UserUploadModel} body contains all possible attributes changeable
     * @return {Observable<UserRetriveModel>} as new observable from modificated profile
     */
    public update(
        id: string,
        body: UserUploadModel
    ): Observable<UserRetriveModel> {
        return this.http.put<UserRetriveModel>(`${this.USERS_URL}/${id}`, body)
    }

    /**
     * Lists all likes from a given profile.
     *
     * @param {string} id of profile with a list of likes requested
     * @param {number} limit size of page
     * @param {string} next is id_cursor of next page
     * @param {number} page is number of page of pagination
     * @returns {Observable<UserListLikesModel>} as new observable of a list of likes
     */
    public listLikes(
        id: string,
        limit?: number,
        next?: string,
        page?: number
    ): Observable<UserListLikesModel> {
        return this.http.get<UserListLikesModel>(
            `${this.USERS_URL}/${id}/likes?limit=${limit ? limit : ''}&next=${
                next ? next : ''
            }&page=${page ? page : ''}`
        )
    }

    /**
     * Lists all indications received by a given profile.
     *
     * @param {string} id of profile with a list of indications requested
     * @param {number} limit size of page
     * @param {string} next is id_cursor of next page
     * @param {number} page is number of page of pagination
     * @returns {Observable<UserListIndicationsModel>} as new observable of a list of indications
     */
    public listIndications(
        id: string,
        limit?: number,
        next?: string,
        page?: number
    ): Observable<UserListIndicationsModel> {
        return this.http.get<UserListIndicationsModel>(
            `${this.USERS_URL}/${id}/indications?limit=${
                limit ? limit : ''
            }&next=${next ? next : ''}&page=${page ? page : ''}`
        )
    }

    /**
     * Lists all indications made by a given profile.
     *
     * @param {string} id of profile with a list of indications requested
     * @param {number} limit size of page
     * @param {string} next is id_cursor of next page
     * @param {number} page is number of page of pagination
     * @returns {Observable<UserListIndicationsModel>} as new observable of a list of indications
     */
    public listIndicationsFrom(
        id: string,
        limit?: number,
        next?: string,
        page?: number
    ): Observable<UserListIndicationsModel> {
        return this.http.get<UserListIndicationsModel>(
            `${this.USERS_URL}/${id}/indications/from?limit=${
                limit ? limit : ''
            }&next=${next ? next : ''}&page=${page ? page : ''}`
        )
    }

    /**
     * Makes current user follow given profile.
     * @param {string} id of profile to follow
     * @returns {Observable<UserCreateFollowModel>} as new observable of success message from following task
     */
    public createFollow(id: string): Observable<UserCreateFollowModel> {
        return this.http.post<UserCreateFollowModel>(
            `${this.USERS_URL}/${id}/follow`,
            null
        )
    }

    /**
     * Makes current user unfollow given profile.
     * @param {string} id of profile to unfollow
     * @returns {Observable<UserCreateFollowModel>} as new observable of success message from unfollowing task
     */
    public deleteFollow(id: string): Observable<UserDeleteFollowModel> {
        return this.http.delete<UserDeleteFollowModel>(
            `${this.USERS_URL}/${id}/follow`
        )
    }

    /**
     * Lists all playlists of a given profile.
     *
     * @param {string} id of profile with a list of playlists requested
     * @param {number} limit size of page
     * @param {string} next is id_cursor of next page
     * @param {number} page is number of page of pagination
     * @returns {Observable<UserListIndicationsModel>} as new observable of a list of playlists
     */
    public listPlaylists(
        id: string,
        limit?: number,
        next?: string,
        page?: number
    ): Observable<UserListPlaylistsModel> {
        return this.http.get<UserListPlaylistsModel>(
            `${this.USERS_URL}/${id}/playlists?limit=${
                limit ? limit : ''
            }&next=${next ? next : ''}&page=${page ? page : ''}`
        )
    }

    /**
     * Returns an user's subscription.
     *
     * @param {string} id of profile requested
     * @returns {Observable<UserSubscriptionModel>} as new observable of subscription from the profile passed throught
     */
    public retriveSubscription(id: string): Observable<UserSubscriptionModel> {
        return this.http.get<UserSubscriptionModel>(
            `${this.USERS_URL}/${id}/subscription`
        )
    }
}
