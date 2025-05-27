import { StackScreenProps } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { SignupStackParamList } from "../../navigation/SignupStack";

type CategoryScreenProps = StackScreenProps<SignupStackParamList, "Category">

export default function CategoryScreen({navigation, route} : CategoryScreenProps){
    return(
        <View>
            <Text></Text>
        </View>
    )
}