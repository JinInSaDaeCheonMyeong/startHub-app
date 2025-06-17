import { Response } from "../util/response.type";


export interface RefreshRequest {
    refresh : StringConstructor
}

export interface RefreshResponse extends Response {
    data : {
        access : string,
        refresh : string
    }
}