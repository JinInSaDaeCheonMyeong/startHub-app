import Checkbox from "expo-checkbox"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../constants/color"
import RightArrow from "../../assets/icons/right-arrow-back.svg"


type SelectAgreementProps = {
    value : boolean
    title : string
    onSelect : (value : boolean) => void
    onClick : () => void
}

export default function SelectAgreement(props : SelectAgreementProps){

    return ( 
        <View>
            <Checkbox
                value={props.value}
                onValueChange={(value) => {
                    props.onSelect(value)
                }}
                style={props.value ? styles.selectCheckBox : styles.unSelectCheckBox}
            />
            <TouchableOpacity onPress={props.onClick}>
                <Text>{props.title}</Text>
                <RightArrow width={20} height={20} color={Colors.gray3}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    selectCheckBox : {
        width : 20,
        height : 20,
        borderColor : Colors.primary,
        backgroundColor : Colors.primary,
        borderRadius : 6,
        borderWidth : 1
    },
    unSelectCheckBox : {
        width : 20,
        height : 20,
        borderColor : Colors.gray3,
        borderRadius : 6,
        borderWidth : 1
    },
})