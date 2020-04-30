interface PaymentMethodData {
    id: string
}

interface StripeSubscription {
    id: string
    cancel_at: number
    cancel_at_period_end: boolean
    canceled_at: number
    current_period_end: 1590105843
    current_period_start: 1587513843
    customer: string
    discount: null
    ended_at: null
    next_pending_invoice_item_invoice: null
}

interface UpcomingInvoice {
    amount_due: number
    amount_paid: number
    amount_remaining: number
    discount: number
    due_date: number
    ending_balance: 0
    footer: null
    paid: boolean
    period_end: number
    period_start: number
    subscription: string
    subtotal: number
}

export class UpcomingInvoiceModel {
    data: UpcomingInvoice
}
export class StripeSubscriptionModel {
    data: StripeSubscription
}
export class PaymentMethodListModel {
    data: PaymentMethodData[]
}

export class PaymentMethodRetriveModel {
    data: PaymentMethodData
}

interface SubscriptionModel {
    id_profile: string
    id_role: string
    recurrence: string
    price: string
    id_source: string
    type_source: string
    datetime_created: Date
    datetime_updated: Date
    datetime_expiration: Date
}

export class SubscriptionRetrieveModel {
    data: SubscriptionModel
}
