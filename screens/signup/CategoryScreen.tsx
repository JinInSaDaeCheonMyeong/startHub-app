import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { SignupStackParamList } from "../../navigation/SignupStack";
import CommonButton from "../../component/CommonButton";

type CategoryScreenProps = StackScreenProps<SignupStackParamList, "Category">

export default function CategoryScreen({navigation, route} : CategoryScreenProps){
    return(
        <View>
            <View>
                <View>
                    <Text>드디어 마지막입니다!</Text>
                    <Text>어떤 주제에 관심 있으신가요?</Text>
                </View>
                <ScrollView>
                </ScrollView>
            </View>
            <View>
                <Text></Text>
                <CommonButton title="완료" onPress={() => {}}/>
            </View>
        </View>
    )
}