import { RoleData } from './role.model'
import { PictureModel } from './pictures.model'

export interface ProfileModel {
    _id?: string
    name?: string
    last_name?: string
    score?: number
    phone?: string
    indications?: number
    indications_from?: number
    liked?: number
    deleted?: boolean
    datetime_created?: string
    datetime_updated?: string
    picture_profile?: PictureModel
    picture_cover?: PictureModel
    compositions?: number
    interpretations?: number
    username?: string
    email?: string
    accepted_terms?: number
    accepted_policy?: number
    email_confirmed?: boolean
    role?: RoleData
    location?: string
    description?: string
    followers?: number
    following?: number
    is_following?: boolean
    two_factor?: boolean
    device_tokens?: any[]
}
