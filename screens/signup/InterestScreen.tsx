import { FlatList, StyleSheet, Text, View } from "react-native";
import CategorySelectButton from "../../component/auth/CategorySelectButton";
import { Colors } from "../../constants/Color";
import { InterestTypeList } from "../../constants/InterestTypeList";
import { Fonts } from "../../constants/Fonts";

type InterestScreenProps = {
    interestList : string[]
    setInterestList : (list : string[]) => void
}

export default function InterestScreen(props : InterestScreenProps){

    return(
        <View style={styles.mainContainer}>
            <View style={styles.textBox}>
                <Text style={styles.subText}>드디어 마지막입니다!</Text>
                <Text style={styles.mainText}>어떤 주제에 관심 있으신가요?</Text>
            </View>
            <FlatList
            data={InterestTypeList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle = {styles.listContentContainer}
            renderItem={({item : {id, color, text, icon}}) => (
                <CategorySelectButton
                    key={id}
                    id={id}
                    color={color}
                    text={text}
                    icons={icon}
                    onClick={(id) => {
                        if (props.interestList.includes(id)) {
                            props.setInterestList(props.interestList.filter(key => key !== id))
                        } else {
                            const interestList = [...props.interestList]
                            interestList.push(id)
                            props.setInterestList(interestList)
                        }
                    }}
                    selected = {props.interestList.includes(id)}
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
        fontFamily : Fonts.medium,
        color : Colors.black2
    },
    mainText : {
        fontSize : 20,
        fontFamily : Fonts.bold,
        color : Colors.black2
    },
    listContentContainer : {
        gap : 16
    }
})