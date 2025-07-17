import { Response } from "../util/response.type";

export interface GetMeResponse extends Response {
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

export interface GetUserResponse extends Response {
    data : {
        username : string,
        profileImage : string,
        companyIds : number[]
    }
}