import { ValidError } from "../../../type/error/error.type"
import { useAuthValid } from "../../util/auth/useAuthValid"

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

export const useSignupInputValid = () => {
    const {
        isValidInfo,
        isValidLocation,
        isValidInterest
    } = useAuthValid()

    const validSignupInputForm = (
        progress : number,
        data : UserInfo | LocationInfo | InterestInfo
    ) : ValidError => {
        switch(progress){
            case 1 :
                const validInfoResult = isValidInfo(data as UserInfo)
                return validInfoResult
            case 2 :
                const validLocationResult = isValidLocation(data as LocationInfo)
                return validLocationResult
            case 3 : 
                const validInterestListResult = isValidInterest(data as InterestInfo)
                return validInterestListResult
            default :
                return {value : false, message : "알 수 없는 오류가 발생했습니다."}
        }
    }

    return {
        validSignupInputForm
    }
}