import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/color";
import CommonButton from "../../component/CommonButton";


export default function InfoScreen() {
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