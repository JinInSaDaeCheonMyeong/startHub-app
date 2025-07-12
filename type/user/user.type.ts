import { Response } from "../util/response.type";

export interface GetUserResponse extends Response {
    data : {
        id : string
        email : string
        username : string
        birth : string
        gender : string
        profileImage : string
    }
}