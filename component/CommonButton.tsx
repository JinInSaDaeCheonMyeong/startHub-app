import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Color";

type CommonButtonProps = {
    title : string,
    onPress : () => void,
}

export default function CommonButton(props : CommonButtonProps) {
    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : Colors.primary,
        borderRadius : 8,
        alignItems : "center",
        justifyContent : "center",
        paddingVertical : 20
    },
    text : {
        color : Colors.white1,
        fontSize : 18,
        fontWeight : "bold"
    }
})