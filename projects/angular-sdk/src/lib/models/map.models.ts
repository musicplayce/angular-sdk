export interface Point {
    size?: number
    geopoint: GeoPoint
    class?: string
}

export interface GeoPoint {
    type?: string
    coordinates: number[]
}

export interface HistogramData {
    data: HistogramPoint[]
    post_duration: number
}

export interface HistogramPoint {
    x: number
    class1: number
    class2?: number
    total?: number
}

export interface DateHistogramPoint {
    y: number
    x: CustomDate
}

export interface CustomDate {
    year: number
    month: number
    date: number
    hours: number
}
