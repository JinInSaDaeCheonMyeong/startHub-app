import { Response } from "../../util/response.type"

export interface LoginRequest{
    email : string,
    password : string
}

export interface LoginResponse extends Response{
    data : {
        access : string,
        refresh : string
    }
}