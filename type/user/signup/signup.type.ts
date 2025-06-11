import { Response } from "../../util/response.type";

export interface SignupRequest{
    email : string,
    password : string
}

export interface SignupFormData extends SignupRequest {
    verifyNumber : string
    checkPassword : string
    checked : {
        ONE : boolean
        SECOND : boolean
        THIRD : boolean
    },
    allChecked : boolean
}

export type CheckedKeyType = keyof SignupFormData['checked'];

export interface SignupResponse extends Response{}
