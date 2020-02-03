import { Role } from './role.response.model'
import { Picture } from './picture.response.model'

export interface Profile {
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
    picture_profile?: Picture
    picture_cover?: Picture
    username?: string
    email?: string
    accepted_terms?: number
    accepted_policy?: number
    email_confirmed?: boolean
    role?: Role
    location?: string
    description?: string
    followers?: number
    following?: number
    isFollowing?: boolean
}

export class ProfileData {
    data: Profile
}

export class ProfileListData {
    data: Profile[]
}
