import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  UserListModel,
  UserRetriveModel,
  UserUploadModel,
  UserListLikesModel,
  UserListIndicationsModel
} from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  public USERS_URL: string = "https://api-beta.musicplayce.com/v1/users";

  constructor(private http: HttpClient) {}

  public list(): Observable<UserListModel> {
    return this.http.get<UserListModel>(this.USERS_URL);
  }

  public retrive(id: string): Observable<UserRetriveModel> {
    return this.http.get<UserRetriveModel>(`${this.USERS_URL}/${id}`);
  }

  public update(
    id: string,
    body: UserUploadModel
  ): Observable<UserRetriveModel> {
    return this.http.put<UserRetriveModel>(`${this.USERS_URL}/${id}`, body);
  }

  public listLikes(
    id: string,
    limit?: number,
    next?: string,
    page?: number
  ): Observable<UserListLikesModel> {
    return this.http.get<UserListLikesModel>(
      `${this.USERS_URL}/${id}/likes?limit=${limit ? limit : ""}&next=${
        next ? next : ""
      }&page=${page ? page : ""}`
    );
  }

  public listIndications(
    id: string,
    limit?: number,
    next?: string,
    page?: number
  ): Observable<UserListIndicationsModel> {
    return this.http.get<UserListIndicationsModel>(
      `${this.USERS_URL}/${id}/indications?limit=${limit ? limit : ""}&next=${
        next ? next : ""
      }&page=${page ? page : ""}`
    );
  }

  public listIndicationsFrom(
    id: string,
    limit?: number,
    next?: string,
    page?: number
  ): Observable<UserListIndicationsModel> {
    return this.http.get<UserListIndicationsModel>(
      `${this.USERS_URL}/${id}/indications/from?limit=${
        limit ? limit : ""
      }&next=${next ? next : ""}&page=${page ? page : ""}`
    );
  }
}
