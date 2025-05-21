import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/color";
import CommonButton from "../../component/CommonButton";
import DropDownPicker from "react-native-dropdown-picker";
import TopButton from "../../assets/icons/top-arrow-back.svg"
import BottomButton from "../../assets/icons/bottom-arrow-back.svg"
import CheckMark from "../../assets/icons/checkmark.svg"
import { useState } from "react";


export default function InfoScreen() {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const dropdownItems = [{label : "남",  value : "남"}, {label : "여",  value : "여"}]

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
                        <Text style={styles.mainText}>{"(선택)당신의 성별이 궁금합니다!"}</Text>
                    </View>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={dropdownItems}
                        setOpen={setOpen}
                        setValue={setValue}
                        placeholder="성별"
                        placeholderStyle={{
                            color : Colors.gray2,
                            fontSize : 18,
                            fontWeight : "medium"
                        }}
                        style={{
                            backgroundColor : Colors.white2,
                            borderWidth : 0,
                            borderRadius : 8,
                            padding : 16
                        }}
                        dropDownContainerStyle={{
                            backgroundColor : Colors.white2,
                            borderWidth : 0,
                            borderRadius : 8,
                        }}
                        textStyle={{
                            color : Colors.black2,
                            fontSize : 18,
                            fontWeight : "medium",
                            paddingVertical : 8,
                            paddingHorizontal : 6,
                        }}
                        labelStyle={{
                            color : Colors.black2,
                            fontSize : 18,
                            fontWeight : "medium",
                            paddingVertical : 8,
                            paddingHorizontal : 6,
                        }}
                        ArrowUpIconComponent={
                            ({style}) => (
                            <TopButton 
                                width={18} 
                                height={18} 
                                color={Colors.gray2} 
                                style={style}
                            />
                        )}
                        ArrowDownIconComponent={
                            ({style}) => (
                            <BottomButton
                                width={18}
                                height={18}
                                color={Colors.gray2}
                                style={style}
                            />
                        )}
                        TickIconComponent={
                            ({style}) => (
                            <CheckMark
                                width={18}
                                height={18}
                                color={Colors.gray2}
                                style={style}
                            />
                        )}
                    />
                </View>
            </View>
            <CommonButton title="다음으로" onPress={() => {}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        justifyContent : "space-between",
    },
    inputContainer : {
        gap : 56
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