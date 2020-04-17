import { TagModel } from './tags.model'
import { PlaylistModel } from './playlists.model'
import { ProfileModel } from './profiles.model'
import { CursorModel } from './cursor.model'

interface AuditionPlaylists {
    unclassified: PlaylistModel
    red: PlaylistModel
    yellow: PlaylistModel
    green: PlaylistModel
}

export interface AuditionModel {
    _id: String
    name: String
    description: String
    playlists: AuditionPlaylists
    tags: TagModel[]
    artists: ProfileModel[]
    video_url: String
}

export interface AuditionUpdateModel {
    name: String
    description: String
    id_tags: String[]
    id_artists: String[]
    video_url: String
}

export interface AuditionUpdatedModel {
    message: String
}

export interface AuditionCreateModel {
    name: String
    description: String
    id_tags: String[]
    id_artists: String[]
    video_url: String
}

export interface AuditionListModel {
    data: AuditionModel[]
    cursor: CursorModel
}

export interface AuditionRetrieveModel {
    data: AuditionModel
}
