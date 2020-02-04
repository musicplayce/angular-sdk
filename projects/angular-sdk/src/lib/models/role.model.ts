import { PrivilegesData } from "./privilege.model";
import { QuotasData } from "./quotas.model";

export interface RoleData {
  _id?: string;
  name?: string;
  type?: string;
  privileges?: PrivilegesData;
  deleted?: boolean;
  datetimeCreated?: string;
  datetimeUpdated?: string;
  quotas?: QuotasData;
}

export class RoleModel {
  data: RoleData;
}
