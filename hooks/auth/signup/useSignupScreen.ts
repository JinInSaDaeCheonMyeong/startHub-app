import { useCallback, useState } from "react"
import { SignupScreenProps } from "../../../screens/SignupScreen"
import { useError } from "../../util/useError"
import { SignupFormData, SignupRequest } from "../../../type/user/signup.type"
import { useSignupValid } from "./useSignupValid"
import { SendcodeRequest } from "../../../type/email/sendcode.type"
import { DefaultErrorMessage } from "../../../type/error/error.type"
import { VerifyRequest } from "../../../type/email/verify.type"
import { useDisabled } from "../../util/useDisabled"
import { sendcode, verify } from "../../../api/email"
import { signup } from "../../../api/user"
import { ShowToast, ToastType } from "../../../util/ShowToast"

export const useSignupScreen = ({navigation} : SignupScreenProps ) => {
    const [formData, setFormData] = useState<SignupFormData>({
        email : '',
        verifyCode : '',
        password : '',
        checkPassword : '',
        checked : {
            ONE : false, //필수
            SECOND : false, //필수
            THIRD : false //필수
        },
        allChecked : false
    })
    const {
        value : {
            errorText,
            errorVisible
        },
        handler : {
            showError,
            hideError,
            handleAxiosError
        },
    } = useError()
    
    const {
        validSignupForm,
        isValidEmail
    } = useSignupValid()
    const {
        disabled,
        disabledBtn,
        enabledBtn
    } = useDisabled()

    const updateFormData = useCallback(<K extends keyof SignupFormData>(key : K, value : SignupFormData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorVisible){
            hideError()
        }
    }, [errorVisible])

    const setEmail = useCallback((value : string) => updateFormData('email', value), [updateFormData])
    const setVerifyNumber = useCallback((value : string) => updateFormData('verifyCode', value), [updateFormData])
    const setPassword = useCallback((value : string) => updateFormData('password', value), [updateFormData])
    const setCheckPassword = useCallback((value : string) => updateFormData('checkPassword', value), [updateFormData])
    const setChecked = useCallback((key : string, value : boolean) => {
        setFormData(prev => {
                const newChecked = {...prev.checked, [key] : value}
                const allCheckedValue = newChecked.ONE && newChecked.SECOND && newChecked.THIRD
            return {
                ...prev,
                checked : newChecked,
                allChecked : allCheckedValue
            }
        })
    }, [updateFormData])

    const setAllChecked = (value : boolean) => {
        updateFormData('allChecked', value)
        updateFormData('checked', {ONE : value, SECOND : value, THIRD : value})
    }

    const goBack = () => {
        disabledBtn()
        navigation.goBack()
        enabledBtn()
    }

    const requestSignup = async () => {
        disabledBtn()

        const email = formData.email.trim()
        const verifyCode = formData.verifyCode.trim()
        const password = formData.password.trim()
        const checkPassword = formData.checkPassword.trim()
        const {checked : {ONE, SECOND, THIRD}} = formData

        const validResult = validSignupForm(
            email,
            verifyCode,
            password,
            checkPassword,
            ONE,
            SECOND,
            THIRD
        )
        if(!validResult.isValid) {
            enabledBtn()
            showError(validResult.message)
            return 
        }
        const verifyData : VerifyRequest = {
            email : email,
            code : verifyCode
        }
        const signupData : SignupRequest = {
            email : email,
            password : password
        }
        try {
            await verify(verifyData) 
            await signup(signupData)
            navigation.navigate('SignupInput')
        } catch (error) {
            handleAxiosError(error, (value) => {showError(value)})
        } finally {
            enabledBtn()
        }
    }

    const requestSendcode = async () => {
        disabledBtn()
        const email = formData.email.trim()
        const validResult = isValidEmail(email)
        if(!validResult.isValid) {
            enabledBtn()
            showError(validResult.message)
            return
        }
        const sendcodeData : SendcodeRequest = {
            email : email
        }
        try {
            await sendcode(sendcodeData)
            ShowToast("요청 성공", "인증번호의 유효 시간은 5분입니다", ToastType.SUCCESS)
        } catch (error) {
            handleAxiosError(error, (value) => {showError(value)})
            enabledBtn()
            return
        }
        enabledBtn()
    }

    return {
        form : {
            ...formData,
            setEmail,
            setVerifyNumber,
            setPassword,
            setCheckPassword,
            setChecked,
            setAllChecked
        },
        actions : {
            goBack,
            requestSignup,
            requestSendcode
        },
        ui : {
            errorText,
            errorVisible,
            disabled
        }
    }
}