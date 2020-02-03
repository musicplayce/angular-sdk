export class PollVoteSend {
    total_listen_time: number
    playback_moment: number

    constructor(total_listen_time: number, playback_moment: number) {
        this.total_listen_time = total_listen_time
        this.playback_moment = playback_moment
    }
}

export class PollVoteDataModel {
    data: Data
}

export interface Data {
    _id: string
    id_profile: string
    id_post: string
    question: string
    option1: string
    option2: string
    votes1: number
    votes2: number
    deleted: boolean
    datetime_created: Date
    datetime_updated: Date
}
