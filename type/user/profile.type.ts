import { InterestType } from "../../constants/InterestType"

export interface SetProfileRequest {
    username : string
    introduction : string
    birth : string,
    gender : string,
    interests : string[],
    profileImage : string
}