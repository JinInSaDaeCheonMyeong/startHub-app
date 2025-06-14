import { ValidError } from "../../../type/error/error.type";
import { InterestInfo, LocationInfo, UserInfo } from "../../auth/input/useSignupInputValid";

export const useAuthValid = () => {

    const isValidEmail = (email : string) : ValidError => {
        if(!email){
            return {value : false, message : "이메일을 입력해주세요"}
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return {value : false, message : "이메일 형식이 올바르지 않습니다"}
        }
        return {value : true}
    }

    const isValidPassword = (password : string, checkPassword ?: string) : ValidError => {
        if(!password){
            return {value : false, message : "비밀번호를 입력해주세요"}
        }
        if(checkPassword !== undefined){
            if(!checkPassword){
                return {value : false, message : "비밀번호 확인을 입력해주세요"}
            }
            if(password !== checkPassword){
                return {value : false, message : "비밀번호가 일치하지 않습니다"}
            }
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if(!passwordRegex.test(password)){
            return {value : false, message : "비밀번호는 대소문자, 숫자, 특수문자(@$!%*?&)가 포함되어야 합니다"}
        }
        return {value : true}
    }

    const isValidVerifyCode = (verifyCode : string) : ValidError => {
        if(!verifyCode) {
            return {value : false, message : "인증번호를 입력해주세요"}
        }
        return {value : true}
    }

    const isValidChecked = (one : boolean, second : boolean, third : boolean) : ValidError => {
        if(!one && !second && !third){
            return {value : false, message : "필수 항목에 체크해 주세요"}
        }
        return {value : true}
    }

    const isValidInfo = (
        data : UserInfo
    ) : ValidError => {
        const {name, year, month, day} = data
        if(!name){
            return {value : false, message : "이름을 입력해주세요!"}
        }
        if(!year || !month || !day){
            return {value : false, message : "생년월일을 입력해주세요!"}
        }
        const date = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2,"0")}`)
        if(isNaN(date.getTime())){
            return {value : false, message : "올바른 생년월일을 입력해주세요!"}
        }
        return {value : true}
    }

    const isValidLocation = (data : LocationInfo) : ValidError => {
        const {location} = data
        if(!location){
            return {value : false, message : "지역을 선택해주세요!"}
        }
        return {value : true}
    }

    const isValidInterest = (data : InterestInfo) : ValidError => {
        const { interestList } = data
        if(interestList.length === 0){
            return {value : false, message : "주제를 최소 한개 선택해주세요!"}
        }
        return {value : true}
    }

    return {
        isValidEmail,
        isValidPassword,
        isValidVerifyCode,
        isValidChecked,
        isValidInfo,
        isValidLocation,
        isValidInterest
    }
}