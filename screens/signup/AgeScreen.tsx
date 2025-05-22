import { StackScreenProps } from "@react-navigation/stack";
import { Text, TextInput, View } from "react-native";
import { SignupStackParamList } from "../../navigation/SignupStack";
import CommonButton from "../../component/CommonButton";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors } from "../../constants/color";
import TopButton from "../../assets/icons/top-arrow-back.svg"
import BottomButton from "../../assets/icons/bottom-arrow-back.svg"
import CheckMark from "../../assets/icons/checkmark.svg"

type AgeScreenProps = StackScreenProps<SignupStackParamList, "Age">

export default function AgeScreen({navigation, route} : AgeScreenProps) {
    
    const [errorText, setErrorText] = useState("")
    const [errorVisible, setErrorVisible] = useState(false)
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const dropdownItems = [
        {label : "10대",  value : "10대"}, 
        {label : "20대",  value : "20대"},
        {label : "30대",  value : "30대"}, 
        {label : "40대",  value : "40대"},
        {label : "50대",  value : "50대"}, 
        {label : "60대 이상",  value : "60대 이상"}
    ]

    return(
        <View>
            <View>
                <View>
                    <View>
                        <Text>{"회원님의 생년월일을 입력해주세요!"}</Text>
                        <Text>{"생일을 축하를 해드리고 싶어요!"}</Text>
                    </View>
                    <View>
                        <TextInput/>
                        <TextInput/>
                        <TextInput/>
                    </View>
                </View>
                <View>
                    <View>
                        <Text>{"회원님의\n관심 연령대를 입력해주세요!"}</Text>
                        <Text>{"(선택) 관심 연령대를 입력해주세요!"}</Text>
                    </View>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={dropdownItems}
                        setOpen={setOpen}
                        setValue={setValue}
                        placeholder="연령대"
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
            <View>
                {errorVisible && <Text>{errorText}</Text>}
                <CommonButton title="다음으로" onPress={() => {}}/>
            </View>
        </View>
    )
}