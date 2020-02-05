export interface QuotasData {
    DAILY_UPLOADS?: number
    MONTHLY_UPLOADS?: number
    WEEKLY_UPLOADS?: number
    DASH_ARTIST_LIST?: number
    DASH_SONGWRITER_LIST?: number
    DASH_QUIZ_LIST?: number
    DASH_POLL_LIST?: number
}

export class QuotasModel {
    data: QuotasData
}
