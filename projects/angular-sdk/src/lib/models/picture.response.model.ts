export interface Picture {
    id?: string
    url?: string
    type?: string
    resources?: string[]
    deleted?: boolean
    datetimeCreated?: string
    datetimeUpdated?: string
}

export class PictureData {
    data: Picture
}
