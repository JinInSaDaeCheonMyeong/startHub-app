import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/Color";
import { Fonts } from "../../constants/Fonts";

type LocationScreenProps = {
    introduction : string,
    setIntroduction : (value : string) => void
    gender : string,
    setGender : (value : string) => void
}

export default function LocationScreen(props : LocationScreenProps) {

    const [selectGender, setSelectGender] = useState(props.gender === "MALE" ? true : false)

    return(
        <View style={styles.mainContainer}>
            <View style={styles.inputBox}>
                <View style={styles.textBox}>
                    <Text style={styles.subText}>{"회원님의 간단한 \n소개를 입력해주세요!"}</Text>
                    <Text style={styles.mainText}>당신의 소개가 궁금합니다!</Text>
                </View>
                <TextInput
                    style={styles.inputText}
                    placeholder="자신을 간단히 소개해주세요..."
                    placeholderTextColor={Colors.gray3}
                    value={props.introduction}
                    onChangeText={(s) => {props.setIntroduction(s)}}
                />
            </View>
            <View style={styles.inputBox}>
                <View style={styles.textBox}>
                    <Text style={styles.subText}>회원님의 성별을 선택해주세요!</Text>
                    <Text style={styles.mainText}>당신의 성별이 궁금합니다!</Text>
                </View>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            props.setGender("MALE")
                            setSelectGender(true)
                        }}
                        style={[styles.genderBox, {borderColor : selectGender ? Colors.primary : Colors.white2 }]}
                    >
                        <Text style={[styles.selectText, {color : selectGender ? Colors.primary : Colors.gray2 }]}>남</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            props.setGender("FEMALE")
                            setSelectGender(false)
                        }}
                        style={[styles.genderBox, {borderColor : !selectGender ? Colors.primary : Colors.white2 }]}
                    >
                        <Text style={[styles.selectText, {color : !selectGender ? Colors.primary : Colors.gray2 }]}>여</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        gap : 56,
        overflow : "hidden"
    },
    textBox : {
        gap : 4
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
    inputText : {
        fontSize : 18,
        color : Colors.black2,
        fontFamily : Fonts.medium
    },
    inputBox : {
        gap : 16,
    },
    genderBox : {
        flex : 1,
        padding  : 16,
        backgroundColor : Colors.white2,
        borderRadius : 8,
        alignItems : "center",
        borderWidth : 1,
        borderStyle : "solid",
    },
    selectText : {
        fontFamily : Fonts.medium,
        fontSize : 16,
        color : Colors.gray2,
    },
    genderContainer : {
        flexDirection : "row",
        justifyContent : "space-between",
        gap : 16
    },
})