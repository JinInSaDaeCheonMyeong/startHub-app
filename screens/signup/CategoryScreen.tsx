import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { SignupStackParamList } from "../../navigation/SignupStack";
import CommonButton from "../../component/CommonButton";
import CategorySelectButton from "../../component/auth/CategorySelectButton";
import { Colors } from "../../constants/color";
import { categorySelectButtons } from "../../constants/categorySelectButtons";

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
                    {categorySelectButtons.map((item) => (
                        <CategorySelectButton
                            categoryKey={item.category}
                            title={item.title}
                            color={item.color}
                            icons={item.icon}
                            onClick={(categoryKey) => {}}
                        />
                    ))}
                </ScrollView>
            </View>
            <View>
                <Text></Text>
                <CommonButton title="완료" onPress={() => {}}/>
            </View>
        </View>
    )
}