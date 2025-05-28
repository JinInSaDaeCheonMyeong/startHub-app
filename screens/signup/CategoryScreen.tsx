import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { SignupStackParamList } from "../../navigation/SignupStack";
import CommonButton from "../../component/CommonButton";
import CategorySelectButton from "../../component/auth/CategorySelectButton";
import { Colors } from "../../constants/color";
import { categorySelectButtons } from "../../constants/categorySelectButtons";

type CategoryScreenProps = StackScreenProps<SignupStackParamList, "Category">

export default function CategoryScreen({navigation, route} : CategoryScreenProps){
    let selectCategoryList : string[] = []
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
                            key={item.category}
                            title={item.title}
                            color={item.color}
                            icons={item.icon}
                            onClick={(categoryKey) => {
                                if (selectCategoryList.includes(categoryKey)) {
                                    selectCategoryList = selectCategoryList.filter(key => key !== categoryKey);
                                } else {
                                    selectCategoryList.push(categoryKey);
                                }
                                console.log(selectCategoryList);
                            }}
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