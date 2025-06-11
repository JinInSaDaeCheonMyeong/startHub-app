import { VaildError } from "../../../type/error/error.type";

export const useAuthValid = () => {
    const isVaildEmail = (email : string) : VaildError => {
        if(!email){
            return {value : false, message : "이메일을 입력해주세요"}
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return {value : false, message : "이메일 형식이 올바르지 않습니다"}
        }
        return {value : true}
    }
    const isVaildPassword = (password : string, checkPassword ?: string) : VaildError => {
        if(!password){
            return {value : false, message : "비밀번호를 입력해주세요"}
        }
        if(checkPassword !== null){
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

    return {
        isVaildEmail,
        isVaildPassword
    }
}