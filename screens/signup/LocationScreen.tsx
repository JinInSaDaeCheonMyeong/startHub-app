import { Text, View } from "react-native";
import AuthDropDown from "../../component/auth/AuthDropDown";
import { useState } from "react";
import { LocationItems } from "../../constants/LocationItems";


export default function LocationScreen() {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return(
        <View>
            <View>
                <View>
                    <Text>회원님이 사는 지역을 선택해주세요!</Text>
                    <Text>가까운 주변 공고를 알려드릴게요!</Text>
                </View>
                <AuthDropDown
                    open={open}
                    value={value}
                    setOpen={setOpen}
                    setValue={setValue}
                    items={LocationItems}
                    placeholder="지역"
                />
            </View>
        </View>
    )
}