import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { UsersService } from "./users.service";
import {
  UserListModel,
  UserRetriveModel,
  UserUploadModel,
  UserListLikesModel,
  UserListIndicationsModel,
  UserCreateFollowModel,
  UserListPlaylistsModel,
  UserSubscriptionModel
} from "../models/user.model";
import { RoleModel } from "../models/role.model";

describe("UsersService", () => {
  let injector: TestBed;
  let service: UsersService;
  let httpMock: HttpTestingController;

  let id: string = "5e39d5fc26a06400111e0915";
  let limit: number = 2;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    injector = getTestBed();
    service = injector.get(UsersService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("#list should return some Users", () => {
    const dummyUsers: UserListModel = {
      data: [
        {
          _id: "1",
          username: "fellipe",
          role: {
            _id: "1"
          },
          email: "fellipeac2@gmail.com"
        },

        {
          _id: "2",
          username: "ferraz",
          role: {
            _id: "2"
          },
          email: "ferraz@musicplayce.com"
        }
      ],
      cursor: {
        previous: null,
        next: "3"
      }
    };

    service.list(limit).subscribe(users => {
      expect(users.data.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const request = httpMock.expectOne(
      `${service.USERS_URL}?limit=${limit}&next=&page=`
    );
    expect(request.request.method).toBe("GET");
    request.flush(dummyUsers);
  });

  it("#retrive should return an user", () => {
    const dummyUser: UserRetriveModel = {
      data: {
        _id: id,
        username: "fellipe",
        role: {
          _id: "1"
        },
        email: "fellipeac2@gmail.com"
      }
    };

    service.retrive(id).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const request = httpMock.expectOne(`${service.USERS_URL}/${id}`);
    expect(request.request.method).toBe("GET");
    request.flush(dummyUser);
  });

  it("#update should return updated values", () => {
    const body: UserUploadModel = {
      phone: "+55629987654321"
    };
    const dummyUser: UserRetriveModel = {
      data: {
        _id: id,
        username: "fellipe",
        role: {
          _id: "1"
        },
        email: "fellipeac2@gmail.com",
        phone: body.phone
      }
    };

    service.update(id, body).subscribe(retrive => {
      expect(retrive).toEqual(dummyUser);
    });

    const request = httpMock.expectOne(`${service.USERS_URL}/${id}`);
    expect(request.request.method).toBe("PUT");
    request.flush(dummyUser);
  });

  it("#listLikes should return a list of two likes", () => {
    const dummyListLikes: UserListLikesModel = {
      data: [
        {
          _id: "1",
          id_post: "p1",
          id_profile: id
        },
        {
          _id: "2",
          id_post: "2",
          id_profile: id
        }
      ],
      cursor: {
        previous: null,
        next: "3"
      }
    };

    service.listLikes(id, limit).subscribe(listLikes => {
      expect(listLikes.data.length).toBe(limit);
      expect(listLikes).toEqual(dummyListLikes);
    });

    const request = httpMock.expectOne(
      `${service.USERS_URL}/${id}/likes?limit=${limit}&next=&page=`
    );
    expect(request.request.method).toBe("GET");
    request.flush(dummyListLikes);
  });

  it("#listIndications should return a list of two indications to a profile", () => {
    const dummyListIndications: UserListIndicationsModel = {
      data: [
        {
          _id: "1",
          id_profile_from: "2",
          id_profile_to: id,
          id_post: "1",
          listen_time_before: 0,
          playback_moment: 0,
          plays_before: 0
        },
        {
          _id: "2",
          id_profile_from: "3",
          id_profile_to: id,
          id_post: "1",
          listen_time_before: 0,
          playback_moment: 0,
          plays_before: 0
        }
      ],
      cursor: {
        previous: null,
        next: "3"
      }
    };

    service.listIndications(id, limit).subscribe(listIndications => {
      expect(listIndications.data.length).toBe(limit);
      expect(listIndications).toEqual(dummyListIndications);
    });

    const request = httpMock.expectOne(
      `${service.USERS_URL}/${id}/indications?limit=${limit}&next=&page=`
    );
    expect(request.request.method).toBe("GET");
    request.flush(dummyListIndications);
  });

  it("#listIndications should return a list of two indications by a profile", () => {
    const dummyListIndications: UserListIndicationsModel = {
      data: [
        {
          _id: "1",
          id_profile_from: "2",
          id_profile_to: id,
          id_post: "1",
          listen_time_before: 0,
          playback_moment: 0,
          plays_before: 0
        },
        {
          _id: "2",
          id_profile_from: "3",
          id_profile_to: id,
          id_post: "1",
          listen_time_before: 0,
          playback_moment: 0,
          plays_before: 0
        }
      ],
      cursor: {
        previous: null,
        next: "3"
      }
    };

    service.listIndicationsFrom(id, limit).subscribe(listIndications => {
      expect(listIndications.data.length).toBe(limit);
      expect(listIndications).toEqual(dummyListIndications);
    });

    const request = httpMock.expectOne(
      `${service.USERS_URL}/${id}/indications/from?limit=${limit}&next=&page=`
    );
    expect(request.request.method).toBe("GET");
    request.flush(dummyListIndications);
  });

  it("#createFollow should receive a message of success", () => {
    const dummyCreateFollow: UserCreateFollowModel = {
      message: "Successfully unfollowed profile"
    };
    service.createFollow(id).subscribe(request => {
      expect(request).toEqual(dummyCreateFollow);
    });
    const request = httpMock.expectOne(`${service.USERS_URL}/${id}/follow`);
    expect(request.request.method).toBe("POST");
    request.flush(dummyCreateFollow);
  });

  it("#deleteFollow should receive a message of success", () => {
    const dummyCreateFollow: UserCreateFollowModel = {
      message: "Successfully unfollowed profile"
    };
    service.deleteFollow(id).subscribe(request => {
      expect(request).toEqual(dummyCreateFollow);
    });
    const request = httpMock.expectOne(`${service.USERS_URL}/${id}/follow`);
    expect(request.request.method).toBe("DELETE");
    request.flush(dummyCreateFollow);
  });

  it("#listPlaylists should return a list of two playlists by a profile", () => {
    const dummyListPlaylists: UserListPlaylistsModel = {
      data: [
        {
          _id: "1",
          id_profile: id,
          name: "playlist 1",
          duration: 300,
          length: 8,
          is_editable: false,
          is_public: false
        },
        {
          _id: "2",
          id_profile: id,
          name: "playlist 2",
          duration: 150,
          length: 4,
          is_editable: false,
          is_public: true
        }
      ],
      cursor: {
        previous: null,
        next: "3"
      }
    };

    service.listPlaylists(id, limit).subscribe(listPlaylists => {
      expect(listPlaylists.data.length).toBe(limit);
      expect(listPlaylists).toEqual(dummyListPlaylists);
    });

    const request = httpMock.expectOne(
      `${service.USERS_URL}/${id}/playlists?limit=${limit}&next=&page=`
    );
    expect(request.request.method).toBe("GET");
    request.flush(dummyListPlaylists);
  });

  it("#retriveSubscription should return current subscription from an user", () => {
    const dummyRetriveSubscription: UserSubscriptionModel = {
      data: {
        _id: "5e39d5fc26a06400111e0915",
        id_profile: "5dadbdf92bd792001022e16d",
        id_role: "5d719f127db9b75ebfa9acfd",
        recurrence: "months",
        price: "R$ 59,00",
        payment_method: {
          name: "Cartão de Crédito",
          card_last_digits: "4242",
          month_expiration: 4,
          year_expiration: 2024,
          country: "US"
        },
        datetime_expiration: new Date("2500-01-01T00:00:00.000Z"),
        id_source: "sub_Gftw2YNo5EtJS5",
        type_source: "stripe",
        deleted: false,
        datetime_created: new Date("2020-02-04T20:37:16.774Z"),
        datetime_updated: new Date("2020-02-04T20:37:16.774Z"),
        role: {
          _id: "5d719f127db9b75ebfa9acfd",
          name: "Premium",
          type: "premium",
          privileges: {
            PRIV_INTERNAL: false,
            PRIV_SENSITIVE: false,
            PRIV_MEDIA_CREATE: true,
            PRIV_MEDIA_DELETE: false,
            PRIV_USER_READ_STATISTICS: false,
            PRIV_USER_READ_CONTACT: true,
            PRIV_INDICATION_READ_STATISTICS: true,
            PRIV_LIKE_READ_STATISTICS: false,
            PRIV_QUIZ_CREATE: true,
            PRIV_POST_CREATE: true,
            PRIV_POST_COVER_UPLOAD: true,
            PRIV_POST_LYRIC_UPLOAD: true,
            PRIV_PROFILE_UPDATE: true,
            PRIV_INDICATION_CREATE: true,
            PRIV_POST_DELETE: false,
            PRIV_POST_UPDATE: false,
            PRIV_MEDIA_UPDATE: false,
            PRIV_MEDIA_LIST: false,
            PRIV_DASH_POST_LIST: true
          },
          quotas: {
            DAILY_UPLOADS: 3,
            MONTHLY_UPLOADS: -1,
            WEEKLY_UPLOADS: -1,
            DASH_ARTIST_LIST: 1,
            DASH_SONGWRITER_LIST: 1,
            DASH_QUIZ_LIST: -1,
            DASH_POLL_LIST: 0
          }
        },
        datetime_next_billing: new Date("2020-03-05T20:37:11.000Z"),
        datetime_end_trial: new Date("2020-03-05T20:37:11.000Z")
      }
    };

    service.retriveSubscription(id).subscribe(retrive => {
      expect(retrive).toEqual(dummyRetriveSubscription);
    });

    const request = httpMock.expectOne(
      `${service.USERS_URL}/${id}/subscription`
    );
    expect(request.request.method).toBe("GET");
    request.flush(dummyRetriveSubscription);
  });
});
