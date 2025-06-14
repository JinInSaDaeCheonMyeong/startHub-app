import { StackScreenProps } from "@react-navigation/stack"
import { useCallback, useMemo, useState } from "react"
import { AuthStackParamList } from "../../../navigation/AuthStack"
import { useError } from "../../util/useError"
import { InterestInfo, LocationInfo, UserInfo, useSignupInputValid } from "./useSignupInputValid"
import { SignupInputScreenProps } from "../../../screens/SignupInputScreen"

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
    const {
        value : {
            errorVisible,
            errorText
        },
        handler : {
            showError,
            hideError
        }
    } = useError()
    const {
        validSignupInputForm
    } = useSignupInputValid()

    const updateFormData = useCallback(<K extends keyof FormData>(key : K, value : FormData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorVisible){
            hideError()
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

    const goBack = useCallback(() => {
        hideError()
        if(currentProgress <= 1) {
            navigation.goBack()
        } else {
            setCurrentProgress(prev => prev - 1)
        }
    }, [currentProgress, navigation])

    const getValidData = () : UserInfo | LocationInfo | InterestInfo | undefined => {
        const {name, year, month, day, location, interestList} = formData
        switch(currentProgress) {
            case 1:
                return {
                    name : name.trim(),
                    year : year.trim(),
                    month : month.trim(),
                    day : day.trim()
                }
            case 2:
                return {
                    location : location.trim()
                }
            case 3:
                return {
                    interestList : interestList
                }
            default:
                return 
        }
    }

    const goNext = useCallback(() => {
        const validData = getValidData()
        if(!validData) return
        const validResult = validSignupInputForm(currentProgress, validData)
        if(!validResult.value){
            showError(validResult.message)
            return
        }
        hideError()
        if(currentProgress >= MAXPROGRESS) {
            navigation.popTo("Signin")
        } else {
            setCurrentProgress(prev => prev + 1)
        }
    }, [currentProgress, navigation, formData])

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