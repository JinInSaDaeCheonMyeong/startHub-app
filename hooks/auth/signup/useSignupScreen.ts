import { useCallback, useEffect, useState } from "react"
import { SignupScreenProps } from "../../../screens/SignupScreen"
import { useError } from "../../util/useError"
import { SignupFormData } from "../../../type/user/signup/signup.type"
import { useSignupValid } from "./useSignupValid"

export const useSignupScreen = ({navigation} : SignupScreenProps ) => {
    const [formData, setFormData] = useState<SignupFormData>({
        email : '',
        verifyNumber : '',
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
        validSigninForm
    } = useSignupValid()
    const [disabled, setDisabled] = useState(false)
    const disabledBtn = useCallback(() => {setDisabled(true)}, [])
    const abledBtn = useCallback(() => {setDisabled(false)}, [])

    const updateFormData = useCallback(<K extends keyof SignupFormData>(key : K, value : SignupFormData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorVisible){
            hideError()
        }
    }, [errorVisible])

    const setEmail = useCallback((value : string) => updateFormData('email', value), [updateFormData])
    const setVerifyNumber = useCallback((value : string) => updateFormData('verifyNumber', value), [updateFormData])
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

    const setAllChecked = useCallback((value : boolean) => {
        updateFormData('allChecked', value)
        updateFormData('checked', {ONE : value, SECOND : value, THIRD : value})
    }, [updateFormData])

    const goBack = () => {
        navigation.goBack()
    }

    const handleSignup = () => {
        disabledBtn()
        const vaildResult = validSigninForm(formData)
        if(!vaildResult.value) {
            abledBtn()
            showError(vaildResult.message)
            return 
        }
        abledBtn()
        navigation.navigate('SignupInput')
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
            handleSignup,
        },
        ui : {
            errorText,
            errorVisible,
            disabled
        }
    }
}