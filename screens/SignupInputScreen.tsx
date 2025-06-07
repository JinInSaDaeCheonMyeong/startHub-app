import { SafeAreaView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Colors } from "../constants/Color";
import BackButton from "../component/BackButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import * as Progress from 'react-native-progress';
import { useState } from "react";
import InfoScreen from "./signup/InfoScreen";
import CategoryScreen from "./signup/CategoryScreen";
import CommonButton from "../component/CommonButton";
import LocationScreen from "./signup/LocationScreen";

type SignupInfoScreenProps = StackScreenProps<AuthStackParamList, 'SignupInput'>

const InputInfoScreen = [
    InfoScreen,
    LocationScreen,
    CategoryScreen
]

export default function SignupInfoScreen({navigation, route} : SignupInfoScreenProps) {
    const {width} = useWindowDimensions();
    const [currentProgress, setCurrentProgress] = useState(1)
    const [errorVisible, setErrorVisible] = useState(true)
    const [errorText, setErrorText] = useState("error text")
    const CurrentScreen = InputInfoScreen[currentProgress-1]
    const maxProgress = 3;

    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [location, setLocation] = useState('')
    const [interestList, setInterestList] = useState<string[]>([])

    const goBack = () => {
        if(currentProgress < 2) {
            navigation.goBack()
        } else {
            setCurrentProgress(currentProgress - 1)
        }
    }

    const goNext = () => {
        if(currentProgress >= maxProgress) {
            navigation.popTo("Signin")
        } else {
            setCurrentProgress(currentProgress + 1)
        }
    }

    const transformDate = () => {
        if(year.length == 0 || month.length == 0 || day.length == 0){return "없음"}
        return new Date(`${year}-${month}-${day}`)
    }

    return(
    <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
        <BackButton 
            width={20} 
            height={20} 
            color={Colors.black2} 
            onClick={()=>{
                goBack()
            }}
        /> 
        <View style={styles.progressBarContainer}>
            <Text>{`${currentProgress} of ${maxProgress}`}</Text>
            <Progress.Bar 
                width={width - 32} 
                progress={currentProgress / maxProgress}
                color={Colors.primary} 
                borderColor={Colors.white2}
                unfilledColor={Colors.white2}
                borderWidth={0}
            />
        </View>
        <CurrentScreen
            name={name}
            year={year}
            month={month}
            day={day}
            location={location}
            interestList={interestList}
            setName={(s) => {setName(s)}}
            setYear={(s) => {setYear(s)}}
            setMonth={(s) => {setMonth(s)}}
            setDay={(s) => {setDay(s)}}
            setLocation={(s) => {setLocation(s)}}
            setInterestList={(list) => setInterestList(list)}
        />
        <View style={styles.buttonContainer}>
            {errorVisible && <Text style={styles.errorText}>{errorText}</Text>}
            <CommonButton title={currentProgress == maxProgress ? "완료" : "다음"} onPress={() => {goNext()}}/>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        margin : 16,
    },
    progressBarContainer : {
        width : "100%",
        marginBottom : 36,
        gap : 8,
        alignItems : "flex-end"
    },
    buttonContainer : {
        paddingTop : 8,
        gap : 8
    },
    errorText : {
        textAlign : "center",
        color : Colors.error,
        fontSize : 12,
        fontWeight : "semibold"
    },
})