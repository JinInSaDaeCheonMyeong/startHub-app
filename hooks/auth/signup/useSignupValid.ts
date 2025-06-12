import { VaildError } from "../../../type/error/error.type"
import { SignupFormData } from "../../../type/user/signup.type"
import { useAuthValid } from "../../util/auth/useAuthValid"

export const useSignupValid = () => {
    const {
        isVaildEmail,
        isVaildPassword
    } = useAuthValid()

    const validSignupForm = (
        email : string,
        verifyCode : string, 
        password : string, 
        checkPassword : string, 
        ONE : boolean, 
        SECOND : boolean,
        THIRD : boolean
        ) : VaildError => {
        if(!email && !verifyCode && !password && !checkPassword && !ONE && !SECOND && !THIRD){
            return {value : false, message : '입력을 확인해주세요'}
        }
        const emailValid = isVaildEmail(email)
        if(!emailValid.value){
            return emailValid
        }
        if(!verifyCode){
            return {value : false, message : '인증코드를 입력해주세요'}
        }
        const vaildPassword = isVaildPassword(password, checkPassword)
        if(!vaildPassword.value){
            return vaildPassword
        }
        if(!ONE && !SECOND && !THIRD){
            return {value : false, message : "필수 항목에 동의해주세요"}
        }
        return {value : true}
    }

    return {
        validSignupForm,
        isVaildEmail
    }
}