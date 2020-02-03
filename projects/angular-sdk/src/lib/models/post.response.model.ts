import { Media } from './media.response.model'
import { Tag } from './tag.response.model'
import { Profile } from './profile.response.model'

export class PostData {
    data: Post
}

export interface Post {
    id?: string
    name?: string
    duration?: number
    tags?: Tag[]
    lyrics?: string
    likes?: number
    plays?: number
    indications?: number
    acceptedTerms?: number
    processed?: boolean
    deleted?: boolean
    datetimeCreated?: Date
    datetimeUpdated?: Date
    shares?: number
    composers?: Profile[]
    interpreters?: Profile[]
    media?: Media
    picture?: Media
    uploader?: Profile
    cursor?: string
}
