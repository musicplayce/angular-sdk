export class SongItem {
    _id: string
    indications: number
    plays: number
    name: string
    picture_url: string
    indications_total: number

    constructor(
        _id: string,
        indications: number,
        name: string,
        picture_url: string,
        plays: number,
        indications_total: number
    ) {
        this._id = _id
        this.indications = indications
        this.name = name
        this.picture_url = picture_url
        this.plays = plays
        this.indications_total = indications_total
    }
}
