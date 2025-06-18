import { Response } from "../util/response.type";


export interface RefreshRequest {
    refresh : string
}

export interface RefreshResponse extends Response {
    data : {
        access : string,
        refresh : string
    }
}