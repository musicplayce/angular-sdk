export class AuthResponse {
    jwt: {
        iss: string
        token: string
        refresh_token?: string
    }
}
