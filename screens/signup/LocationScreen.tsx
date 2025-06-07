import { StyleSheet, Text, View } from "react-native";
import AuthDropDown from "../../component/auth/AuthDropDown";
import { Dispatch, SetStateAction, useState } from "react";
import { LocationItems } from "../../constants/LocationItems";
import { Colors } from "../../constants/Color";

type LocationScreenProps = {
    location : string,
    setLocation : (value : string) => void
}

export default function LocationScreen(props : LocationScreenProps) {

    const [open, setOpen] = useState(false)

    return(
        <View style={styles.mainContainer}>
            <View style={styles.textBox}>
                <Text style={styles.subText}>회원님이 사는 지역을 선택해주세요!</Text>
                <Text style={styles.mainText}>가까운 주변 공고를 알려드릴게요!</Text>
            </View>
            <AuthDropDown
                open={open}
                value={props.location}
                setOpen={setOpen}
                setValue={(s) => {props.setLocation(s)}}
                items={LocationItems}
                placeholder="지역"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        gap : 16,
        overflow : "hidden"
    },
    textBox : {
        gap : 4
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
    }
})