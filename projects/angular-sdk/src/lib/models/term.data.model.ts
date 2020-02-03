export class TermDataModel {
    data : Data;
}
export interface Data {
    _id : string;
    name : string;
    description : string;
    body : string;
    version : number;
    datetime_created : string;
    datetime_updated : string;
}