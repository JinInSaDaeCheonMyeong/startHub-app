import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { HomeStackParamList } from "../../../navigation/HomeStack";
import { RootStackParamList } from "../../../navigation/RootStack";
import { StackScreenProps } from "@react-navigation/stack";
import { RecruitsItemType } from "../../../type/notice/recruits.type";
import { useCallback, useState } from "react";
import RecruitsItem from "../../../component/notice/RecruitsItem";
import { Colors } from "../../../constants/Color";
import { Fonts } from "../../../constants/Fonts";
import { getRecruitsList } from "../../../api/recruits";
import { isAxiosError } from "axios";
import { ErrorResponse } from "../../../type/util/response.type";
import { ShowToast, ToastType } from "../../../util/ShowToast";

export type MatchScreenProps = CompositeScreenProps<
    BottomTabScreenProps<HomeStackParamList, 'Match'>,
    StackScreenProps<RootStackParamList>
>

export default function MatchScreen({navigation} : MatchScreenProps) {
    const [recruitsItems, setRecruitsItems] = useState<RecruitsItemType[]>([])

    const getRecruitsItems = async () => {
        try {
            console.log("요청 보냄")
            const response = (await getRecruitsList(0, 10)).data.content
            console.log("요청 받음")
            setRecruitsItems(response)
        } catch (error : unknown) {
            if(isAxiosError(error)){
                const response = error.response
                if(!response){
                    ShowToast("오류 발생", "네트워크 오류가 발생했습니다", ToastType.ERROR)
                    return
                } 
                const errorData = response.data as ErrorResponse
                ShowToast("오류 발생", errorData.message, ToastType.ERROR)
                return
            }
            ShowToast("오류 발생", "알 수 없는 오류가 발생했습니다", ToastType.ERROR)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getRecruitsItems()
        }, [])
    )
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>매칭</Text>
            <FlatList
                style={{paddingHorizontal : 16}}
                data={recruitsItems}
                contentContainerStyle={{gap : 16}}
                renderItem={({item}) => (
                    <RecruitsItem
                        id={item.id}
                        title={item.title}
                        companyName={item.companyName}
                        endDate={item.endDate}
                        isClosed={item.isClosed}
                        viewCount={item.viewCount}
                        createdAt={item.createdAt}
                        isHome={false}
                        onPress={(id) => {navigation.navigate("InMatch", {matchId : id})}}
                    />
                )}
            />
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    titleText : {
        color : Colors.black2,
        fontFamily : Fonts.semiBold,
        fontSize : 18,
        margin : 16
    }
})