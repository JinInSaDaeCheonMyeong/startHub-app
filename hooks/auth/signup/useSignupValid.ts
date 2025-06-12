import { ValidError } from "../../../type/error/error.type"
import { SignupFormData } from "../../../type/user/signup.type"
import { useAuthValid } from "../../util/auth/useAuthValid"

export const useSignupValid = () => {
    const {
        isValidEmail,
        isValidPassword,
        isValidVerifyCode,
        isValidChecked
    } = useAuthValid()

    const validSignupForm = (
        email : string,
        verifyCode : string, 
        password : string, 
        checkPassword : string, 
        ONE : boolean, 
        SECOND : boolean,
        THIRD : boolean
        ) : ValidError => {
        if(!email && !verifyCode && !password && !checkPassword && !ONE && !SECOND && !THIRD){
            return {value : false, message : '입력을 확인해주세요'}
        }
        const emailValid = isValidEmail(email)
        if(!emailValid.value){
            return emailValid
        }
        const verifyCodeValid = isValidVerifyCode(verifyCode)
        if(!verifyCodeValid){
            return verifyCodeValid
        }
        const passwordValid = isValidPassword(password, checkPassword)
        if(!passwordValid.value){
            return passwordValid
        }
        const checkedValid = isValidChecked(ONE, SECOND, THIRD)
        if(!checkedValid){
            return checkedValid
        }
        return {value : true}
    }

    return {
        validSignupForm,
        isValidEmail
    }
}