import { Response } from "../../util/response.type";

export interface SignupRequest{
    email : string,
    password : string
}

export interface SignupResponse extends Response{
    
}