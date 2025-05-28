import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { SignupStackParamList } from "../../navigation/SignupStack";
import CommonButton from "../../component/CommonButton";
import CategorySelectButton from "../../component/auth/CategorySelectButton";
import { Colors } from "../../constants/color";
import { categorySelectButtons } from "../../constants/categorySelectButtons";
import { useState } from "react";

type CategoryScreenProps = StackScreenProps<SignupStackParamList, "Category">

export default function CategoryScreen({navigation, route} : CategoryScreenProps){

    const [errorVisible, setErrorVisible] = useState(false)
    const [errorText, setErrorText] = useState("안녕")
    let selectCategoryList : string[] = []

    return(
        <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
                <View style={styles.textBox}>
                    <Text style={styles.subText}>드디어 마지막입니다!</Text>
                    <Text style={styles.mainText}>어떤 주제에 관심 있으신가요?</Text>
                </View>
                <FlatList 
                data={categorySelectButtons}
                contentContainerStyle = {styles.listContentContainer}
                renderItem={({item}) => (
                    <CategorySelectButton
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        color={item.color}
                        icons={item.icon}
                        onClick={(id) => {
                            if (selectCategoryList.includes(id)) {
                                selectCategoryList = selectCategoryList.filter(key => key !== id);
                            } else {
                                selectCategoryList.push(id);
                            }
                            console.log(selectCategoryList);
                        }}
                    />
                )}
                />
            </View>
            <View style={styles.buttonContainer}>
                {errorVisible && <Text style={styles.errorText}>{errorText}</Text>}
                <CommonButton title="완료" onPress={() => {}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        justifyContent : "space-between",
    },
    inputContainer : {
        gap : 24,
        flex : 1
    },
    textBox : {
        gap : 4
    },
    buttonContainer : {
        paddingTop : 8,
        gap : 8
    },
    categorySelectContainer : {
        gap : 16
    },
    subText : {
        fontSize : 16,
        fontWeight : "medium",
        color : Colors.black2
    },
    mainText : {
        fontSize : 20,
        fontWeight : "bold",
        color : Colors.black2
    },
    errorText : {
        textAlign : "center",
        color : Colors.error,
        fontSize : 12,
        fontWeight : "semibold"
    },
    listContentContainer : {
        gap : 16
    }
})