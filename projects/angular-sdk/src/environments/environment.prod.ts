const API_BASE = 'https://api.musicplayce.com/v1'
const API_DATA_BASE = API_BASE + '/data'

export const environment = {
    production: true,

    COOKIE_DOMAIN: '.musicplayce.com',

    // AUTH
    PROFILE: API_BASE + '/auth/me',
    SIGNIN: API_BASE + '/auth/signin',
    SIGNUP: API_BASE + '/auth/signup',
    SIGNOUT: API_BASE + '/auth/signout',
    SIGNIN_SPOTIFY: API_BASE + '/auth/social/spotify',
    FORGOT: API_BASE + '/auth/forgot',
    VALIDATE_TOKEN: API_BASE + '/auth/validate',
    VERIFY_SIGNUP_TOKEN: API_BASE + '/auth/signup/verify',
    RESET_PASSWORD: API_BASE + '/auth/reset',
    POLL: API_BASE + '/polls',
    TERMS: API_BASE + '/terms',
    ACCEPT_TERMS: API_BASE + '/auth/me/accept_terms',
    SUBSCRIPTIONS: API_BASE + '/subscriptions',
    USERS: API_BASE + '/users',
    CHECKOUT: API_BASE + '/subscriptions/checkout',
    POSTS: API_BASE + '/posts',
    PLACES: API_BASE + '/places',

    NO_AUTH_REDIRECT_URL: 'https://musicplayce.com/',

    // DATA

    SINGER_INDICATIONS_SEARCH:
        API_DATA_BASE + '/dashboard/search/indications/singer',
    SONGWRITER_INDICATIONS_SEARCH:
        API_DATA_BASE + '/dashboard/search/indications/songwriter',

    STRIPE_PUBLIC_KEY: 'pk_live_k4MSeaF4YUL7oGkRtEyYe3cH002a7c2GUx',
    STRIPE_SUCCESS_URI: 'http://musicplayce.com/dashboard',
    STRIPE_ERROR_URI: 'http://musicplayce.com',
    STRIPE_PLANS: {
        starter: 'plan_GDp0WRJLBlFlX5',
        premium: 'plan_GDp1UgtwJgjnHQ',
        pro: 'plan_GETEyr4cOzh4fV'
    },

    SPOTIFY_REDIRECT_URI: 'https://musicplayce.com/auth/spotify',
    SPOTIFY_CLIENT_ID: '141a8d176925462b96a51556bd5a839b',

    DATA_POLL: API_BASE + '/data/polls/',
    DATA_INDICATION: API_BASE + '/data/indications/',
    DATA_DASH: API_BASE + '/data/dashboard/'
}
