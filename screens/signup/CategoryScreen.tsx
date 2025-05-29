import { FlatList, StyleSheet, Text, View } from "react-native";
import CategorySelectButton from "../../component/auth/CategorySelectButton";
import { Colors } from "../../constants/color";
import { categorySelectButtons } from "../../constants/categorySelectButtons";

type CategoryScreenProps = {}

export default function CategoryScreen(props : CategoryScreenProps){

    let selectCategoryList : string[] = []

    return(
        <View style={styles.mainContainer}>
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
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        gap : 24,
        overflow : "hidden"
    },
    textBox : {
        gap : 4
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
    listContentContainer : {
        gap : 16
    }
})