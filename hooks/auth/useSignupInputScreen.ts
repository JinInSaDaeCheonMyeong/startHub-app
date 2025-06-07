import { useCallback, useMemo, useState } from "react"

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

export const useSignupInputScreen = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA)

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

    return {
        formData,
        setName,
        setYear,
        setMonth,
        setDay,
        setLocation,
        setInterestList,
        transformDate
    }
}