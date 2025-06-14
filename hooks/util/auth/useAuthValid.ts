import { ValidError } from "../../../type/error/error.type";

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
        if(checkPassword !== null && checkPassword !== undefined){
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

    return {
        isValidEmail,
        isValidPassword,
        isValidVerifyCode,
        isValidChecked
    }
}