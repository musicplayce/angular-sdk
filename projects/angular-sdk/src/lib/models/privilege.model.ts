export interface PrivilegesData {
    PRIV_INTERNAL?: boolean
    PRIV_SENSITIVE?: boolean
    PRIV_MEDIA_CREATE?: boolean
    PRIV_MEDIA_DELETE?: boolean
    PRIV_USER_READ_STATISTICS?: boolean
    PRIV_USER_READ_CONTACT?: boolean
    PRIV_INDICATION_READ_STATISTICS?: boolean
    PRIV_LIKE_READ_STATISTICS?: boolean
    PRIV_QUIZ_CREATE?: boolean
    PRIV_POST_CREATE?: boolean
    PRIV_POST_COVER_UPLOAD?: boolean
    PRIV_POST_LYRIC_UPLOAD?: boolean
    PRIV_PROFILE_UPDATE?: boolean
    PRIV_INDICATION_CREATE?: boolean
    PRIV_POST_DELETE?: boolean
    PRIV_POST_UPDATE?: boolean
    PRIV_MEDIA_UPDATE?: boolean
    PRIV_MEDIA_LIST?: boolean
    PRIV_DASH_POST_LIST?: boolean
    PRIV_DASH_ARTIST?: boolean
    PRIV_DASH_ARTIST_LIST?: boolean
    PRIV_DASH_SONGWRITER?: boolean
    PRIV_DASH_SONGWRITER_LIST?: boolean
    PRIV_DASH_QUIZ?: boolean
    PRIV_DASH_QUIZ_LIST?: boolean
    PRIV_DASH_POLL?: boolean
    PRIV_DASH_POLL_LIST?: boolean
}

export class PrivilegesModel {
    data: PrivilegesData
}
