import { VaildError } from "../../../type/error/error.type"
import { SigninFormData, SigninRequest } from "../../../type/user/signin.type"
import { useAuthValid } from "../../util/auth/useAuthValid"

export const useSigninValid = () => {
    const {
        isVaildEmail,
        isVaildPassword
    } = useAuthValid()

    const validSigninForm = (formData : SigninFormData) : VaildError => {
        const {
            email, 
            password
        } = formData
        if(!email && !password){
            return { value : false, message : "입력을 확인해주세요"}
        }
        const emailValid = isVaildEmail(email)
        if(!emailValid.value){
            return emailValid
        }
        const passwordValid = isVaildEmail(password)
        if(!passwordValid.value){
            return passwordValid
        }
        return { value : true }
    }

    return {
        validSigninForm
    }
}