import { StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SignupStackParamList } from "../../navigation/SignupStack";
import { Colors } from "../../constants/color";
import CommonButton from "../../component/CommonButton";
import { useState } from "react";

type ContactScreenProps = StackScreenProps<SignupStackParamList, 'Contact'>

export default function ContactScreen({navigation, route} : ContactScreenProps) {

    const [callNumText, setCallNumText] = useState("")

    return(
        <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                    <View style={styles.textBox}>
                        <Text style={styles.subText}>
                            {"회원님의 \n이메일 주소를 입력해주세요!"}
                        </Text>
                        <Text style={styles.mainText}>
                            이메일로 연락하고 싶어요!
                        </Text>
                    </View>
                    <TextInput
                        style={styles.inputText}
                        placeholder="이메일 주소를 입력해주세요..."
                    />
                </View>
                <View style={styles.inputBox}>
                    <View style={styles.textBox}>
                        <Text style={styles.subText}>
                            {"회원님의 \n전화번호를 입력해주세요!"}
                        </Text>
                        <Text style={styles.mainText}>
                            {"(선택)전화번호로 연락하고 싶어요!"}
                        </Text>
                    </View>
                    <TextInput
                        value={callNumText}
                        onChangeText={(text) => {setCallNumText(text.replace(/\n/g, ""));}}
                        style={styles.inputText}
                        placeholder={"전화번호를 입력해주세요... \nex) 010-2520-6780"}
                        multiline ={true}
                        numberOfLines={2}
                        keyboardType="phone-pad"
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
        fontWeight : "medium",
        textAlignVertical: "top"
    }
})