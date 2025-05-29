import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/color";
import CommonButton from "../../component/CommonButton";
import DropDownPicker from "react-native-dropdown-picker";
import TopButton from "../../assets/icons/top-arrow-back.svg"
import BottomButton from "../../assets/icons/bottom-arrow-back.svg"
import CheckMark from "../../assets/icons/checkmark.svg"
import { useState } from "react";
import AuthDropDown from "../../component/auth/AuthDropDown";
import { StackScreenProps } from "@react-navigation/stack";

type InfoScreenProps = {}

export default function InfoScreen(props : InfoScreenProps) {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const dropdownItems = [{label : "남",  value : "남"}, {label : "여",  value : "여"}]
    const [errorText, setErrorText] = useState("")
    const [errorVisible, setErrorVisible] = useState(false)

    return(
        <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
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
            <View style={styles.buttonContainer}>
                {errorVisible && <Text style={styles.errorText}>{errorText}</Text>}
                <CommonButton title="다음으로" onPress={() => {}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        justifyContent : "space-between",
    },
    inputContainer : {
        flex : 1,
        gap : 56,
        overflow : "hidden"
    },
    inputBox : {
        gap : 16
    },
    buttonContainer : {
        paddingTop : 8,
        gap : 8
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
    errorText : {
        textAlign : "center",
        color : Colors.error,
        fontSize : 12,
        fontWeight : "semibold"
    },
})