import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Color";
import VisibleIcon from "../../assets/icons/eye.svg"
import InVisibleIcon from "../../assets/icons/eye.fill.svg"
import { useState } from "react";
import { Fonts } from "../../constants/Fonts";

type AuthTextInputProps = {
    placeHolder : string,
    placeHolderTextColor : string,
    value : string,
    isPassword : boolean,
    onChange : (text : string) => void
}

export default function AuthTextInput(props : AuthTextInputProps){
    const [visible, setVisible] = useState(true)
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textInput}
                placeholder={props.placeHolder}
                placeholderTextColor={props.placeHolderTextColor}
                value={props.value}
                onChangeText={
                    (text) => props.onChange(text)
                }
                secureTextEntry={props.isPassword && visible}
                autoCapitalize="none"
            />
            {props.isPassword ? (
                <TouchableOpacity
                onPressIn={() => {setVisible(!visible)}}>{
                    visible ? 
                    <VisibleIcon width={24} height={24} color={Colors.gray2}/>:
                    <InVisibleIcon width={24} height={24} color={Colors.gray2}/>
                    }
                </TouchableOpacity>
            ) : 
            <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width : "100%",
        backgroundColor : Colors.white2,
        borderRadius : 8,
        flexDirection : "row",
        ...Platform.select({
            ios : {
                padding : 16,
                gap : 16,
            },
            android : {
                paddingVertical : 8,
                paddingHorizontal : 16,
                gap : 8
            }
        }),
        justifyContent : "space-between",
        alignItems : "center"
    },
    textInput : {
        flex : 1,
        fontSize : 14,
        color : Colors.black2,
        fontFamily : Fonts.medium
    }
})