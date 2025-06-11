import { VaildError } from "../../../type/error/errorType"
import { SignupFormData } from "../../../type/user/signupType"
import { useAuthValid } from "../../util/auth/useAuthValid"

export const useSignupValid = () => {
    const {
        isVaildEmail,
        isVaildPassword
    } = useAuthValid()

    const validSigninForm = (formData : SignupFormData) : VaildError => {
        const {
            email, verifyCode, password, checkPassword, checked : {ONE, SECOND, THIRD}
        } = formData
        if(!email && !verifyCode && !password && !checkPassword && !ONE && !SECOND && !THIRD){
            return {value : false, message : '입력을 확인해주세요'}
        }
        const emailValid = isVaildEmail(email.trim())
        if(!emailValid.value){
            return emailValid
        }
        if(!verifyCode.trim()){
            return {value : false, message : '인증코드를 입력해주세요'}
        }
        const vaildPassword = isVaildPassword(password.trim(), checkPassword.trim())
        if(!vaildPassword.value){
            return vaildPassword
        }
        if(!ONE && !SECOND && !THIRD){
            return {value : false, message : "필수 항목에 동의해주세요"}
        }
        return {value : true}
    }

    return {
        validSigninForm,
        isVaildEmail
    }
}