import { Response } from "../util/response.type"

export interface SigninRequest{
    email : string,
    password : string
}

export interface SigninResponse extends Response{
    data : {
        access : string,
        refresh : string
    }
}