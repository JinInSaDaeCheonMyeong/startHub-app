import { TextInput, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import SendIcon from "../../assets/icons/send.svg"

export default function InChatFooterBar() {
    return(
        <Shadow
            distance={6} 
            offset={[0, 0]}
            startColor="rgba(185, 185, 185, 0.2)"
            style={{
                width : "100%"
            }}
        >
            <View>
                <TextInput/>
                <TouchableOpacity>
                    <SendIcon/>
                </TouchableOpacity>
            </View>
        </Shadow>
    )
}