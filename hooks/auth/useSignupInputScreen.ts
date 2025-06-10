import { StackScreenProps } from "@react-navigation/stack"
import { useCallback, useMemo, useState } from "react"
import { AuthStackParamList } from "../../navigation/AuthStack"

type SignupInputScreenProps = StackScreenProps<AuthStackParamList, 'SignupInput'>

interface FormData{
    name : string,
    year : string,
    month : string,
    day : string,
    location : string,
    interestList : string[],
}

const INITIAL_FORM_DATA : FormData = {
    name : '',
    year : '',
    month : '',
    day : '',
    location : '',
    interestList : []
}

export const useSignupInputScreen = ({navigation} : SignupInputScreenProps, MAXPROGRESS : number) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA)
    const [currentProgress, setCurrentProgress] = useState(1)
    const [errorVisible, setErrorVisible] = useState(false)
    const [errorText, setErrorText] = useState("")

    const showError = (message : string) => {
        setErrorText(message)
        setErrorVisible(true)
    }
    
    const resetErrorText = () => {
        setErrorText("")
        setErrorVisible(false)
    }

    const updateFormData = useCallback(<K extends keyof FormData>(key : K, value : FormData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorVisible){
            setErrorVisible(false)
            setErrorText("")
        }
    }, [errorVisible])

    const setName = useCallback((value : string) => updateFormData("name", value), [updateFormData])
    const setYear = useCallback((value : string) => updateFormData("year", value), [updateFormData])
    const setMonth = useCallback((value : string) => updateFormData("month", value), [updateFormData])
    const setDay = useCallback((value : string) => updateFormData("day", value), [updateFormData])
    const setLocation = useCallback((value : string) => updateFormData("location", value), [updateFormData])
    const setInterestList = useCallback((value : string[]) => updateFormData("interestList", value), [updateFormData])

    const transformDate = useMemo(() => {
        const {year, month, day} = formData
        if(!year || !month || !day) return null
        const dateString = `${year}-${month.padStart(2, "0")}-${day.padStart(2,"0")}`
        const date = new Date(dateString)
        if(isNaN(date.getTime())) return null
        return date
    }, [formData.year, formData.month, formData.day])

    const varidators = useCallback(() => {
        switch(currentProgress){
            case 1 :
                if(!formData.name.trim()){
                    showError("이름을 입력해주세요!");
                    return false
                }
                if(!formData.year || !formData.month || !formData.day){
                    showError("생년월일을 입력해주세요!")
                    return false
                }
                const date = new Date(`${formData.year}-${formData.month.padStart(2, "0")}-${formData.day.padStart(2,"0")}`)
                if(isNaN(date.getTime())){
                    showError("올바른 생년월일을 입력해주세요!")
                    return false
                }
                return true
            case 2 :
                if(!formData.location){
                    showError("지역을 선택해주세요!");
                    return false
                }
                return true
            case 3 : 
                if(formData.interestList.length === 0){
                    showError("주제를 최소 한개 선택해주세요!")
                    return false
                }
                return true
            default :
                return false
        }
    }, [currentProgress, formData, showError])

    const goBack = useCallback(() => {
        resetErrorText()
        if(currentProgress <= 1) {
            navigation.goBack()
        } else {
            setCurrentProgress(prev => prev - 1)
        }
    }, [currentProgress, navigation, resetErrorText])

    const goNext = useCallback(() => {
        if(!varidators()) return
        resetErrorText()
        if(currentProgress >= MAXPROGRESS) {
            navigation.popTo("Signin")
        } else {
            setCurrentProgress(prev => prev + 1)
        }
    }, [currentProgress, resetErrorText, navigation, varidators])

    return {
        form : {
            ...formData,
            setName,
            setYear,
            setMonth,
            setDay,
            setLocation,
            setInterestList,
        },
        ui : {
            currentProgress,
            errorVisible,
            errorText,
        },
        nav : {
            goBack,
            goNext
        },
    }
}