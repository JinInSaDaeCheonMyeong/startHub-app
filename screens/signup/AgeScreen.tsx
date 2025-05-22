import { StackScreenProps } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { SignupStackParamList } from "../../navigation/SignupStack";

type AgeScreenProps = StackScreenProps<SignupStackParamList, "Age">

export default function AgeScreen({navigation, route} : AgeScreenProps) {
    return(
        <View>
            <Text>AgeScreen</Text>
        </View>
    )
}