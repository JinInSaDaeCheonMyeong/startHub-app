import { Response } from "../util/response.type";

export interface VerifyRequest{
    email : string,
    code : string
}

export interface VerifyResponse extends Response {} 