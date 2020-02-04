import { CursorModel } from "./cursor.model";

// ----------------- User CRUD ------------------
interface UserData {
  _id: string;
  name?: string;
  description?: string;
  location?: string;
  phone?: string;
  info_website?: string;
  info_fb_page?: string;
  info_insta?: string;
  info_youtube?: string;
  indications?: number;
  indications_from?: number;
  following?: number;
  followers?: number;
  interpretations?: number;
  compositions?: number;
  username: string;
  email: string;
  role: string;
}

export class UserListModel {
  data: UserData[];
  cursor: CursorModel;
}

export class UserRetriveModel {
  data: UserData;
}

export class UserUploadModel {
  name?: string;
  description?: string;
  location?: string;
  phone?: string;
  id_picture_profile?: string;
  id_picture_cover?: string;
  id_user?: string;
}

// ----------------- User List Likes ------------------
interface UserListLikesData {
  _id: string;
  id_post: string;
  id_profile: string;
}

export class UserListLikesModel {
  data: UserListLikesData[];
  cursor: CursorModel;
}

// ----------------- User List Indications ------------------
interface UserListIndicationsData {
  _id: string;
  id_profile_from: string;
  id_post: string;
  id_profile_to: string;
  listen_time_before: number;
  plays_before: number;
  playback_moment: number;
}

export class UserListIndicationsModel {
  data: UserListIndicationsData[];
  cursor: CursorModel;
}
