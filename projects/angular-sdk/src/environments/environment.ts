// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const API_BASE = '/v1'
const API_BASE_V2 = '/v2'

//const API_BASE = 'http://localhost:8000/v1'
const API_DATA_BASE = API_BASE + '/data'

export const environment = {
    production: false,

    COOKIE_DOMAIN: 'localhost',
    COOKIE_SECURE: false,

    // AUTH
    PROFILE: API_BASE + '/auth/me',
    SIGNIN: API_BASE_V2 + '/auth/signin',
    SIGNUP: API_BASE_V2 + '/auth/signup',
    SIGNOUT: API_BASE + '/auth/signout',
    SIGNIN_SPOTIFY: API_BASE + '/auth/social/spotify',
    REFRESH: API_BASE_V2 + '/auth/refresh',
    FORGOT: API_BASE + '/auth/forgot',
    VALIDATE_TOKEN: API_BASE + '/auth/validate',
    VERIFY_SIGNUP_TOKEN: API_BASE + '/auth/signup/verify',
    RESET_PASSWORD: API_BASE + '/auth/reset',
    POLL: API_BASE + '/polls',
    TERMS: API_BASE + '/terms',
    ACCEPT_TERMS: API_BASE + '/auth/me/accept_terms',
    USERS: API_BASE + '/users',
    SUBSCRIPTIONS: API_BASE + '/subscriptions',
    CHECKOUT: API_BASE + '/subscriptions/checkout',
    POSTS: API_BASE + '/posts',
    PLACES: API_BASE + '/places',

    NO_AUTH_REDIRECT_URL: '',

    // DATA

    SINGER_INDICATIONS_SEARCH:
        API_DATA_BASE + '/dashboard/search/indications/singer',

    SONGWRITER_INDICATIONS_SEARCH:
        API_DATA_BASE + '/dashboard/search/indications/songwriter',

    STRIPE_PUBLIC_KEY: 'pk_test_0YuuwihLVyebquJMexVWEdZS00IcdodAKB',
    STRIPE_SUCCESS_URI: 'http://localhost:4200/dashboard',
    STRIPE_ERROR_URI: 'http://localhost:4200/',
    STRIPE_PLANS: {
        starter: 'plan_GETLhSeybmnpAm',
        premium: 'plan_GETMgUOTGbxmCd',
        pro: 'plan_GETJuOBTEJ0i3i'
    },

    SPOTIFY_CLIENT_ID: '42ffffab5b9a45289e7b6ede412b3487',

    DATA_POLL: API_BASE + '/data/polls/',
    DATA_INDICATION: API_BASE + '/data/indications/',
    DATA_DASH: API_BASE + '/data/dashboard/'
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
