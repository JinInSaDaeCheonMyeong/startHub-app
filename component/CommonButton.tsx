import { Text, TouchableOpacity } from "react-native";

type CommonButtonProps = {
    title : string,
    onPress : () => void,
}

export default function CommonButton(props : CommonButtonProps) {
    return(
        <TouchableOpacity onPress={props.onPress}>
            <Text>{props.title}</Text>
        </TouchableOpacity>
    )
}