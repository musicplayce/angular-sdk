import { CursorModel } from "./cursor.model";
import { RoleData } from "./role.model";

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
  role: RoleData;
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

// ----------------- User Create Follow ------------------
export class UserCreateFollowModel {
  message: string;
}

// ----------------- User Delete Follow ------------------
export class UserDeleteFollowModel {
  message: string;
}

// ----------------- User List Playlists ------------------
interface UserListPlaylistsData {
  _id: string;
  id_profile: string;
  name: string;
  duration: number;
  length: number;
  is_editable: boolean;
  is_public: boolean;
}

export class UserListPlaylistsModel {
  data: UserListPlaylistsData[];
  cursor: CursorModel;
}

// ----------------- User Retrive Subscription ------------------
export class UserSubscriptionModel {
  data?: UserSubscriptionData;
}

interface UserSubscriptionData {
  _id: string;
  id_profile: string;
  id_role: string;
  id_source: string;
  type_source: string;
  datetime_expiration: Date;
  deleted: boolean;
  datetime_created: Date;
  datetime_updated: Date;
  datetime_next_billing: Date;
  datetime_end_trial: Date;
  payment_method: PaymentMethodData;
  price: string;
  recurrence: string;
  role: RoleData;
}

interface PaymentMethodData {
  name: string;
  card_last_digits: string;
  month_expiration: number;
  year_expiration: number;
  country: string;
}
