import { Role } from './role.response.model'

export class SubscriptionData {
    data: Subscription
}

export interface Subscription {
    _id: string
    id_profile: string
    datetime_expiration: Date
    deleted: boolean
    datetime_created: Date
    datetime_updated: Date
    datetime_next_billing: Date
    datetime_end_trial: Date
    payment_method: PaymentMethod
    price: string
    recurrence: string
    role: Role
}

export interface PaymentMethod {
    name: string
    card_last_digits: string
    month_expiration: number
    year_expiration: number
    country: string
}
