export interface Privileges {
    privInternal?: boolean
    privSensitive?: boolean
    privMediaCreate?: boolean
    privMediaDelete?: boolean
    privUserReadStatistics?: boolean
    privUserReadContact?: boolean
    privProfileUpdate?: boolean
    privIndicationReadStatistics?: boolean
    privLikeReadStatistics?: boolean
    privPostCreate?: boolean
    privPostCoverUpload?: boolean
    privPostLyricUpload?: boolean
    privPollCreate?: boolean
    PRIV_DASH_ARTIST?: boolean
    PRIV_DASH_ARTIST_LIST?: boolean
    PRIV_DASH_SONGWRITER?: boolean
    PRIV_DASH_SONGWRITER_LIST?: boolean
    PRIV_DASH_QUIZ?: boolean
    PRIV_DASH_QUIZ_LIST?: boolean
    PRIV_DASH_POLL?: boolean
    PRIV_DASH_POLL_LIST?: boolean
}

export class PrivilegesData {
    data: Privileges
}
