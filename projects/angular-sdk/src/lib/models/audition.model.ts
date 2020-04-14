import { TagModel } from './tags.model'
import { PlaylistData } from './playlists.model'
import { ProfileModel } from './profiles.model'
import { CursorModel } from './cursor.model'

interface AuditionPlaylists {
    id_playlist_unclassified: PlaylistData
    id_playlist_red: PlaylistData
    id_playlist_yellow: PlaylistData
    id_playlist_green: PlaylistData
}

export interface AuditionModel {
    _id: String
    name: String
    description: String
    playlists: AuditionPlaylists[]
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
