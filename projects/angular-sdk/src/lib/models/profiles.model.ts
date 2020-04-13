import { RoleData } from './role.model'
import { PictureData } from './pictures.model'

export interface ProfileData {
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
    picture_profile?: PictureData
    picture_cover?: PictureData
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
