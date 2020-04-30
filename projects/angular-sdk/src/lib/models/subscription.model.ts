interface PaymentMethodData {
    id: string
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
