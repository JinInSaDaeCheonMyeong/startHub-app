import { StackScreenProps } from "@react-navigation/stack";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SystemStackParamList } from "../../navigation/SystemStack";
import BackButton from "../../component/BackButton";
import { Colors } from "../../constants/Color";
import { Fonts } from "../../constants/Fonts";
import { useState } from "react";
import { Shadow } from "react-native-shadow-2";

type ProfileScreenProps = StackScreenProps<SystemStackParamList, 'EditProfile'>

export default function EditProfileScreen({navigation, route : {params}} : ProfileScreenProps){
    const birthList = params.birth.split('-')
    const [user, setUser] = useState(params)
    const [year, setYear] = useState(birthList[0])
    const [month, setMonth] = useState(birthList[1])
    const [day, setDay] = useState(birthList[2])
    const [selectGender, setSelectGender] = useState(user.gender === "MALE")
    const {width} = useWindowDimensions()

    // email : DEFAULT_DATA,
    // username : DEFAULT_DATA,
    // birth : DEFAULT_DATA,
    // gender : DEFAULT_DATA,
    // profileImage : DEFAULT_DATA

    return(
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.header}>
                <BackButton
                    width={24}
                    height={24}
                    color={Colors.black2}
                    onClick={() => {navigation.goBack()}}
                />
                <Text style={styles.headerTitle}>프로필</Text>
                <TouchableOpacity
                    onPress={()=>{navigation.popTo("System")}}
                >   
                    <Text
                        style={styles.headerRight}
                    >
                        완료
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dataContainer}>
                <View style={styles.imgContainer}>
                    <Shadow
                        distance={4} 
                        offset={[0, 4]}
                        startColor="rgba(185, 185, 185, 0.2)"
                        style={{borderRadius : 80}}
                    >
                        <Image 
                            style={{
                                width : width/4, 
                                height : width/4,
                                borderRadius : 80
                            }} source={{uri : user.profileImage}}
                        />
                    </Shadow>
                </View>
                <View style={styles.dataInputContainer}>
                    <Text style={styles.titleText}>이름</Text>
                    <TextInput
                        style={styles.dataInputText}
                        value={user.username} 
                        placeholder="이름을 입력해주세요..."
                        placeholderTextColor={Colors.gray2}
                        onChangeText={(value) => {setUser({...user, username : value})}}
                    />
                </View>
                <View style={styles.dataInputContainer}>
                    <Text style={styles.titleText}>성별</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity 
                            onPress={() => setSelectGender(true)}
                            style={[styles.genderBox, {borderColor : selectGender ? Colors.primary : Colors.white2 }]}
                        >
                            <Text style={[styles.selectText, {color : selectGender ? Colors.primary : Colors.gray2 }]}>남</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => setSelectGender(false)}
                            style={[styles.genderBox, {borderColor : !selectGender ? Colors.primary : Colors.white2 }]}
                        >
                            <Text style={[styles.selectText, {color : !selectGender ? Colors.primary : Colors.gray2 }]}>여</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.dataInputContainer}>
                    <Text style={styles.titleText}>생년월일</Text>
                    <View style={styles.genderContainer}>
                        <TextInput
                            style={[styles.dataInputText, {flex : 1, textAlign : "center"}]}
                            inputMode={'numeric'}
                            maxLength={4}
                            value={year} 
                            placeholder="YYYY"
                            placeholderTextColor={Colors.gray2}
                            onChangeText={(value) => {setYear(value)}}
                        />
                        <TextInput
                            style={[styles.dataInputText, {flex : 1, textAlign : "center"}]}
                            inputMode={'numeric'}
                            maxLength={2}
                            value={month} 
                            placeholder="MM"
                            placeholderTextColor={Colors.gray2}
                            onChangeText={(value) => {setMonth(value)}}
                        />
                        <TextInput
                            style={[styles.dataInputText, {flex : 1, textAlign : "center"}]}
                            inputMode={'numeric'}
                            maxLength={2}
                            value={day} 
                            placeholder="DD"
                            placeholderTextColor={Colors.gray2}
                            onChangeText={(value) => {setDay(value)}}
                        />
                    </View>
                </View>
                <View style={styles.dataInputContainer}>
                    <Text style={styles.titleText}>이메일</Text>
                    <TextInput
                        style={styles.dataInputText}
                        value={user.email} 
                        placeholder="이메일을 입력해주세요..."
                        placeholderTextColor={Colors.gray2}
                        onChangeText={(text) => {setUser({...user, email : text})}}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    headerTitle: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 18,
        color: Colors.gray1,
    },
    headerRight: {
        color : Colors.primary,
        fontFamily : Fonts.medium,
        fontSize  : 16
    },
    mainContainer : {
        flex : 1,
    },
    dataContainer : {
        flex : 1,
        padding : 16,
        gap : 24
    },
    dataInputContainer : {
        gap : 12
    },
    genderContainer : {
        flexDirection : "row",
        justifyContent : "space-between",
        gap : 16
    },
    imgContainer : {
        padding : 16,
        justifyContent : "center",
        alignItems : "center"
    },
    dataInputWrap : {
        flex : 1,
        backgroundColor : Colors.white2,
    },
    dataInputText : {
        fontFamily : Fonts.medium,
        fontSize : 16,
        color : Colors.black2,
        backgroundColor : Colors.white2,
        padding : 16,
        borderRadius : 8
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
    titleText : {
        fontFamily : Fonts.bold,
        fontSize : 16,
        color : Colors.black2,
    },
    selectText : {
        fontFamily : Fonts.medium,
        fontSize : 16,
        color : Colors.gray2,
    },
})