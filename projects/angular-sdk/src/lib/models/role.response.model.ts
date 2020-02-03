import { Privileges } from './privilege.response.model'
import { Quotas } from './quotas.response.model'

export interface Role {
    _id?: string
    name?: string
    type?: string
    privileges?: Privileges
    deleted?: boolean
    datetimeCreated?: string
    datetimeUpdated?: string
    quotas?: Quotas
}

export class RoleData {
    data: Role
}
