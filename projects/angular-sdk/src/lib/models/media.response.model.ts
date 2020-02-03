import { Meta } from './meta.response.model'

export interface Media {
    id?: string
    url?: string
    type?: string
    processed?: boolean
    meta?: Meta
}

export class MediaData {
    data: Media
}
