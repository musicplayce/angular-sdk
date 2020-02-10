export class AcceptTermsSendModel {
    accepted_terms: number
    accepted_policy: number

    constructor(accepted_terms: number, accepted_policy: number) {
        this.accepted_terms = accepted_terms
        this.accepted_policy = accepted_policy
    }
}
export class AcceptTermsModel {
    data: Data
}

export interface Data {
    accepted_policy: number
    accepted_terms: number
    datetime_updated: string
    deleted: boolean
}
