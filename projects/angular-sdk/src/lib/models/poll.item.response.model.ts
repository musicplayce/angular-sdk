export interface PollSearchItem {
    _id: string
    post_name: string
    datetime_created: Date
    datetime_updated?: Date
    finished?: boolean
    post_img_url?: string
    question?: string
    option1?: string
    option2?: string
    votes1?: number
    votes2?: number
    votes?: number
    plays?: number
}
