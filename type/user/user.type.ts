import { Response } from "../util/response.type";

export interface GetUserResponse extends Response {
    data : {
        id : number
        email : string
        username : string
        birth : string
        gender : string
        profileImage : string,
        introduction : string
    }
}