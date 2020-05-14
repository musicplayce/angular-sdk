export class SpotifyAuth {
    code: string
    redirect_uri: string
    device_token: string
    accepted_terms: number
    accepted_policy: number
    accepted_marketing: number

    constructor(code: string, redirect_uri: string, accepted_terms: number, accepted_policy: number, accepted_marketing: number) {
        this.code = code
        this.redirect_uri = redirect_uri
        this.accepted_terms = accepted_terms
        this.accepted_policy = accepted_policy
        this.accepted_marketing = accepted_marketing
    }
}
