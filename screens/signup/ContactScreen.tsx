import { StackScreenProps } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { SignupStackParamList } from "../../navigation/SignupStack";

type ContactScreenProps = StackScreenProps<SignupStackParamList, 'Contact'>

export default function ContactScreen({navigation, route} : ContactScreenProps) {
    return(
    <View>
        <Text>ContactScreen</Text>
    </View>
    )
}