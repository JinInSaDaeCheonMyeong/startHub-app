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
    const [errorVisible, setErrorVisible] = useState(true)
    const [errorText, setErrorText] = useState("error text")

    const updateFormData = useCallback(<K extends keyof FormData>(key : K, value : FormData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
    }, [])

    const setName = useCallback((value : string) => updateFormData("name", value), [updateFormData])
    const setYear = useCallback((value : string) => updateFormData("year", value), [updateFormData])
    const setMonth = useCallback((value : string) => updateFormData("month", value), [updateFormData])
    const setDay = useCallback((value : string) => updateFormData("day", value), [updateFormData])
    const setLocation = useCallback((value : string) => updateFormData("location", value), [updateFormData])
    const setInterestList = useCallback((value : string[]) => updateFormData("interestList", value), [updateFormData])

    const transformDate = useMemo(() => {
        const {year, month, day} = formData
        if(!year || !month || !day) return "실패하였음"
        return new Date(`${year}-${month}-${day}`)
    }, [])

    const goBack = () => {
        if(currentProgress < MAXPROGRESS - 1) {
            navigation.goBack()
        } else {
            setCurrentProgress(currentProgress - 1)
        }
    }

    const goNext = () => {
        if(currentProgress >= MAXPROGRESS) {
            navigation.popTo("Signin")
        } else {
            setCurrentProgress(currentProgress + 1)
        }
    }

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