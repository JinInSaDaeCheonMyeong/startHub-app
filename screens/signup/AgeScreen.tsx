import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/color";
import AuthDropDown from "../../component/auth/AuthDropDown";

type AgeScreenProps = {}

export default function AgeScreen(props : AgeScreenProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const dropdownItems = [
        {label : "10대",  value : "10대"}, 
        {label : "20대",  value : "20대"},
        {label : "30대",  value : "30대"}, 
        {label : "40대",  value : "40대"},
        {label : "50대",  value : "50대"}, 
        {label : "60대 이상",  value : "60대 이상"}
    ]

    return(
        <View style={styles.mainContainer}>
            <View style={styles.inputBox}>
                <View style={styles.textBox}>
                    <Text style={styles.subText}>{"회원님의 생년월일을 입력해주세요!"}</Text>
                    <Text style={styles.mainText}>{"생일을 축하를 해드리고 싶어요!"}</Text>
                </View>
                <View style={styles.inputBirthBox}>
                    <TextInput
                        keyboardType="number-pad"
                        placeholder="YYYY"
                        placeholderTextColor={Colors.gray2}
                        maxLength={4}
                        style={styles.birthInputText}
                    />
                    <TextInput
                        keyboardType="number-pad"
                        placeholder="MM"
                        placeholderTextColor={Colors.gray2}
                        maxLength={2}
                        style={styles.birthInputText}
                    />
                    <TextInput
                        keyboardType="number-pad"
                        placeholder="DD"
                        placeholderTextColor={Colors.gray2}
                        maxLength={2}
                        style={styles.birthInputText}
                    />
                </View>
            </View>
            <View style={styles.inputBox}>
                <View style={styles.textBox}>
                    <Text style={styles.subText}>{"회원님의\n관심 연령대를 입력해주세요!"}</Text>
                    <Text style={styles.mainText}>{"(선택) 관심 연령대를 입력해주세요!"}</Text>
                </View>
                <AuthDropDown 
                    open={open} 
                    value={value} 
                    items={dropdownItems} 
                    placeholder="연령대"
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
    inputBirthBox : {
        flexDirection : "row",
        gap : 12
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
    birthInputText : {
        flex : 1,
        backgroundColor : Colors.white2,
        textAlign : "center",
        paddingVertical : 12,
        borderRadius : 8,
        fontSize : 16,
        fontWeight : "medium",
    }
})