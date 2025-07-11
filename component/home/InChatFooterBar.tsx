import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import SendIcon from "../../assets/icons/send.svg"
import { Colors } from "../../constants/Color";
import { useState } from "react";
import { Fonts } from "../../constants/Fonts";

type InChatFooterBarProps = {
    onPress : (value : string) => void
}

export default function InChatFooterBar({onPress} : InChatFooterBarProps) {
    const [text, setText] = useState('')

    return(
        <Shadow
            distance={4} 
            offset={[0, -4]} 
            startColor="rgba(185, 185, 185, 0.2)"
            style={{
                width : "100%"
            }}
        >
            <View style={styles.mainContainer}>
                <TextInput
                    style={styles.textInputBox}
                    value={text}
                    placeholder="채팅을 입력해주세요..."
                    placeholderTextColor={Colors.gray2}
                    onChangeText={(value) => {setText(value)}}
                />
                <TouchableOpacity onPress={() => {
                    onPress(text)
                    setText('')
                }}>
                    <SendIcon
                        width={32}
                        height={32}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            </View>
        </Shadow>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        backgroundColor : Colors.white1,
        flexDirection : 'row',
        justifyContent : "space-between",
        paddingVertical : 12,
        paddingHorizontal : 16,
        gap :12,
        alignItems : "center"
    },
    textInputBox : {
        backgroundColor : Colors.gray4,
        flex : 1,
        borderRadius : 8,
        color : Colors.black2,
        padding : 12,
        fontFamily : Fonts.medium,
        fontSize : 14
    }
})