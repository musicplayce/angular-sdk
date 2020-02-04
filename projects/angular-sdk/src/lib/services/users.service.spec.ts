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
  UserListIndicationsModel
} from "../models/user.model";

describe("UsersService", () => {
  let injector: TestBed;
  let service: UsersService;
  let httpMock: HttpTestingController;

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
          role: "admin",
          email: "fellipeac2@gmail.com"
        },

        {
          _id: "2",
          username: "ferraz",
          role: "admin",
          email: "ferraz@musicplayce.com"
        }
      ],
      cursor: {
        previous: null,
        next: "3"
      }
    };

    service.list().subscribe(users => {
      expect(users.data.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const request = httpMock.expectOne(service.USERS_URL);
    expect(request.request.method).toBe("GET");
    request.flush(dummyUsers);
  });

  it("#retrive should return an user", () => {
    let id: string = "1";
    const dummyUser: UserRetriveModel = {
      data: {
        _id: id,
        username: "fellipe",
        role: "admin",
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
    let id: string = "1";
    const body: UserUploadModel = {
      phone: "+55629987654321"
    };
    const dummyUser: UserRetriveModel = {
      data: {
        _id: id,
        username: "fellipe",
        role: "admin",
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
    let id: string = "1";
    let limit: number = 2;
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
    let id: string = "1";
    let limit: number = 2;
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
    let id: string = "1";
    let limit: number = 2;
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
});
