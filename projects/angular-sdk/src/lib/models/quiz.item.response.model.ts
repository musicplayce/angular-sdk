export interface QuizItemResponseModel {
    _id: string
    post_name: string
    question: string
    datetime_created: Date
    datetime_expiration?: Date
    post_img_url?: string
    indications?: number
    plays?: number
}
