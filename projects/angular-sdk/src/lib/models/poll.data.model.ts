export class PollDataModel {
    data: Data
}

export interface Data {
    _id: string
    question: string
    option1: string
    option2: string
    related: string[]
    profile: Profile
    post: Post
}

export interface Post {
    _id: string
    name: string
    duration: number
    lyrics: string
    likes: number
    plays: number
    indications: number
    accepted_terms: number
    processed: boolean
    deleted: boolean
    datetime_created: Date
    datetime_updated: Date
    media: Media
    picture: Picture
    cursor: string
}

export interface Media {
    _id: string
    url: string
    type: string
    processed: boolean
    meta: MediaMeta
    resources: any[]
    original_url: string
}

export interface MediaMeta {
    size: number
    tagTypes: string[]
    lossless: boolean
    container: string
    codec: string
    sampleRate: number
    numberOfChannels: number
    bitrate: number
    codecProfile: string
    numberOfSamples: number
    duration: number
}

export interface Picture {
    _id: string
    url: string
    type: string
    processed: boolean
    meta: PictureMeta
    resources?: any[]
}

export interface PictureMeta {
    size: number
}

export interface Profile {
    _id: string
    name: string
    picture_profile: Picture
}
