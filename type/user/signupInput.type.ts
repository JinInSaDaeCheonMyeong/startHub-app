
export type UserInfo =  {
    name : string,
    year : string,
    month : string,
    day : string,
} 
export type LocationInfo =  {
    location : string
} 
export type InterestInfo = {
    interestList : string[]
}

export interface SignupInputRequest{
    name : string,
    date : Date,
    location : string,
    interestList : string[]
}

export interface SignupInputFormData extends SignupInputRequest {
    year : string,
    month : string,
    day : string
}