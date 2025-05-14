import { Platform, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../../constants/color";

type AuthTextInputProps = {
    placeHolder : string,
    placeHolderTextColor : string,
}

export default function AuthTextInput(props : AuthTextInputProps){
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textInput}
                placeholder={props.placeHolder}
                placeholderTextColor={props.placeHolderTextColor}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width : "100%",
        backgroundColor : Colors.white2,
        borderRadius : 8,
        ...Platform.select({
            ios : {
                padding : 16
            },
            android : {
                padding : 8
            }
        })
    },
    textInput : {
        fontSize : 14,
        color : Colors.black2,
    }
})