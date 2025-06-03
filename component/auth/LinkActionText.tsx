import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Color";

type LinkActionTextProps = {
    title : string,
    onPress : () => void
}

export default function LinkActionText(props : LinkActionTextProps) {
    return ( 
        <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.linkActionText}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    linkActionText : {
        color : Colors.gray2,
        fontSize : 14,
        fontWeight : "semibold"
    }
})