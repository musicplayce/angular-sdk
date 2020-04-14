import { TagModel } from './tags.model'
import { ProfileModel } from './profiles.model'
import { CursorModel } from './cursor.model'
import { MediaModel } from './media.model'

export interface PostModel {
    id?: string
    name?: string
    duration?: number
    tags?: TagModel[]
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
    composers?: ProfileModel[]
    interpreters?: ProfileModel[]
    media?: MediaModel
    picture?: MediaModel
    uploader?: ProfileModel
    cursor?: string
}

export interface PostListModel {
    data: PostModel[]
    cursor: CursorModel
}
