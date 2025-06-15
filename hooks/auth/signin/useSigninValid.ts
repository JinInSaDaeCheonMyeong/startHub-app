import { ValidError } from "../../../type/error/error.type"
import { SigninFormData } from "../../../type/user/signin.type"
import { useAuthValid } from "../../util/auth/useAuthValid"

export const useSigninValid = () => {
    const {
        isValidEmail,
        isValidPassword
    } = useAuthValid()

    const validSigninForm = (formData : SigninFormData) : ValidError => {
        const {
            email, 
            password
        } = formData
        if(!email && !password){
            return { isValid : false, message : "입력을 확인해주세요"}
        }
        const emailValid = isValidEmail(email)
        if(!emailValid.isValid){
            return emailValid
        }
        const passwordValid = isValidPassword(password)
        if(!passwordValid.isValid){
            return passwordValid
        }
        return { isValid : true }
    }

    return {
        validSigninForm
    }
}