
export interface UserInfo {
    name : string,
    year : string,
    month : string,
    day : string,
} 
export interface LocationInfo {
    introduction : string,
    gender : string
} 
export interface InterestInfo {
    interestList : string[]
}

export interface SignupInputRequest{
    name : string,
    date : Date,
    location : string,
    interestList : string[]
}

export interface SignupInputFormData extends UserInfo, LocationInfo, InterestInfo {}