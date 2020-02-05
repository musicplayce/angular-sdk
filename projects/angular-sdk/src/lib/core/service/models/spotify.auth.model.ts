export class SpotifyAuth {
    code: string
    redirect_uri: string
    device_token: string

    constructor(code: string, redirect_uri: string) {
        this.code = code
        this.redirect_uri = redirect_uri
    }
}
