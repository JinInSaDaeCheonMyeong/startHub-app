import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/Color";
import { useState } from "react";
import AuthDropDown from "../../component/auth/AuthDropDown";
import DateInputText from "../../component/auth/DateInputText";
import { DayList, MonthList, YearList } from "../../constants/\bDateNumber";

type InfoScreenProps = {}

export default function InfoScreen(props : InfoScreenProps) {

    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')

    const transformDate = () => {
        if(year.length == 0 || month.length == 0 || day.length == 0){return "없음"}
        return new Date(`${year}-${month}-${day}`)
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.inputBox}>
                <View style={styles.textBox}>
                    <Text style={styles.subText}>회원님의 이름을 입력해주세요!</Text>
                    <Text style={styles.mainText}>당신의 이름이 궁금합니다!</Text>
                </View>
                <TextInput
                    style={styles.inputText}
                    placeholder="이름을 입력해주세요..."
                    placeholderTextColor={Colors.gray3}
                />
            </View>
            <View style={styles.inputBox}>
                <View style={styles.textBox}>
                    <Text style={styles.subText}>회원님의 생년월일을 입력해주세요!</Text>
                    <Text style={styles.mainText}>{"생일축하를 해드리고 싶어요!"}</Text>
                </View>
                <View style={styles.birthDateContainer}>
                    <DateInputText 
                        data={YearList} 
                        placeholder="YYYY"
                        text={year} 
                        setText={(s) => {setYear(s)}}
                    />
                    <DateInputText 
                        data={MonthList} 
                        placeholder="MM"
                        text={month} 
                        setText={(s) => {setMonth(s)}}
                    />
                    <DateInputText 
                        data={DayList} 
                        placeholder="DD"
                        text={day} 
                        setText={(s) => {setDay(s)}}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        gap : 56,
        overflow : "hidden"
    },
    inputBox : {
        gap : 16,
        zIndex: 1
    },
    textBox : {
        gap : 4
    },
    subText : {
        fontSize : 16,
        fontWeight : "medium",
        color : Colors.black2
    },
    mainText : {
        fontSize : 20,
        fontWeight : "bold",
        color : Colors.black2
    },
    inputText : {
        fontSize : 18,
        color : Colors.black2,
        fontWeight : "medium"
    },
    birthDateContainer : {
        flex : 1,
        flexDirection : "row",
        gap : 16,
    },
    birthInput : {
        flex : 1,
        paddingHorizontal : 16,
        paddingVertical : 12,
        backgroundColor : Colors.white2,
        color : Colors.black2,
        fontSize : 16,
        fontWeight : "medium",
        borderRadius : 8,
        textAlign : "center"
    }
})