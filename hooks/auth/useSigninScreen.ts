import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useCallback, useState } from "react";

type SigninScreenProps = StackScreenProps<AuthStackParamList, 'Signin'>;

interface FormData{
    email : string,
    password : string
}

const INITIAL_FORM_DATA = {
    email : '',
    password : ''
}

export const useSigninScreen = ({navigation} : SigninScreenProps) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA)
    const [errorVisible, setErrorVisible] = useState(false) 
    const [errorText, setErrorText] = useState('')

    const updateFormData = useCallback(<K extends keyof FormData>(key : K, value : FormData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorVisible){
            setErrorVisible(false)
            setErrorText("")
        }
    }, [errorVisible])

    const setEmail = useCallback((value : string) => updateFormData("email", value), [updateFormData])
    const setPassword = useCallback((value : string) => updateFormData("password", value), [updateFormData])



    return {
        form : {
            ...formData,
            setEmail,
            setPassword
        }
    }
}