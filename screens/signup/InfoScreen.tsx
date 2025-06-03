import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/Color";
import { useState } from "react";
import AuthDropDown from "../../component/auth/AuthDropDown";

type InfoScreenProps = {
    onClick : () => void
}

export default function InfoScreen(props : InfoScreenProps) {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const dropdownItems = [{label : "남",  value : "남"}, {label : "여",  value : "여"}]

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
                    <Text style={styles.subText}>회원님의 성별을 선택해주세요!</Text>
                    <Text style={styles.mainText}>{"(선택) 당신의 성별이 궁금합니다!"}</Text>
                </View>
                <AuthDropDown
                    open={open}
                    value={value}
                    items={dropdownItems}
                    placeholder="성별"
                    setOpen={setOpen}
                    setValue={setValue}
                />
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
        gap : 16
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
    }
})