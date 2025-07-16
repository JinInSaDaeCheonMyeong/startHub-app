import {FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Colors } from "../../constants/Color";
import { Fonts } from "../../constants/Fonts";
import { Shadow } from "react-native-shadow-2";
import BMCNote from "../../assets/icons/bmc_note.svg"
import NoticeItem from "../../component/notice/NoticeItem";
import { NoticeItemList } from "../../constants/NoticeItemList";
import MemberNoticeItem from "../../component/notice/RecruitsItem";
import ImminentView from "../../component/home/ImminentView";
import { RecruitsItemType } from "../../type/notice/recruits.type";
import { useCallback, useState } from "react";
import RecruitsItem from "../../component/notice/RecruitsItem";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/core";
import { ShowToast, ToastType } from "../../util/ShowToast";
import { isAxiosError } from "axios";
import { getRecruitsList } from "../../api/recruits";
import { ErrorResponse } from "../../type/util/response.type";
import { HomeStackParamList } from "../../navigation/HomeStack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../navigation/RootStack";
import { StackScreenProps } from "@react-navigation/stack";

export type HomeScreenProps = CompositeScreenProps<
    BottomTabScreenProps<HomeStackParamList, 'Home'>,
    StackScreenProps<RootStackParamList>
>

export default function HomeScreen({navigation} : HomeScreenProps) {
    const [recruitsItems, setRecruitsItems] = useState<RecruitsItemType[]>([])

    const getRecruitsItems = async () => {
        try {
            const response = (await getRecruitsList(0, 10)).data
            setRecruitsItems(response.content)
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
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ImminentView
                    title="dummydummydummydummydummydummydummy"
                    onPress={() => {console.log("마감임박 공고로 이동")}}
                />
                <View style={{height : 16}}/>
                <View style={commonContainer.container}>
                    <Shadow
                        distance={4} 
                        offset={[0, 4]} 
                        startColor="rgba(185, 185, 185, 0.2)"
                        style={{
                            width : "100%"
                        }}
                    >
                        <View style={styles.BMCContainer}>
                            <BMCNote width={50} height={50}/>
                            <Text style={styles.BMCText}>내 BMC가 없어요...</Text>
                        </View>
                    </Shadow>
                </View>
                <View style={{height : 16}}/>
                <View style={[commonContainer.container, styles.flatListContainer]}>
                    <Text style={styles.listText}>추천 공고</Text>
                    <FlatList
                        contentContainerStyle={{gap : 16, paddingHorizontal : 16, paddingBottom : 16 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        onEndReached={() => {

                        }}
                        style={{overflow : 'visible'}}
                        data={NoticeItemList}
                        renderItem={({item}) => (
                            <NoticeItem
                                id={item.id}
                                category={item.category}
                                title={item.title}
                                startTime={item.startTime}
                                endTime={item.endTime}
                                hashTags={item.hashTags}
                                isHome={true}
                                onPress={() => {console.log("안녕")}}
                            />
                        )}
                    />
                </View>
                <View style={[commonContainer.container, styles.flatListContainer]}>
                    <Text style={styles.listText}>멤버 모집</Text>
                    <FlatList
                        contentContainerStyle={{gap : 16, paddingHorizontal : 16, paddingBottom : 16}}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{overflow : 'visible'}}
                        data={recruitsItems}
                        renderItem={({item}) => (
                            <RecruitsItem
                                id={item.id}
                                title={item.title}
                                companyName={item.companyName}
                                endDate={item.endDate}
                                viewCount={item.viewCount}
                                isClosed={item.isClosed}
                                createdAt={item.createdAt}
                                isHome={true}
                                onPress={(id) => {navigation.navigate('InMatch', {matchId : id})}}
                            />
                        )}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const commonContainer = StyleSheet.create({
    container : {
        overflow : "visible", 
        paddingHorizontal : 16
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor : Colors.white1,
        gap : 16,
    },
    BMCContainer : {
        backgroundColor : Colors.white1,
        justifyContent : "center",
        alignItems : "center",
        paddingVertical : 60,
        borderRadius : 8,
        gap : 12
    },
    flatListContainer : {
        gap : 12,
        paddingVertical : 16,
        paddingHorizontal : 0
    },
    BMCText : {
        color : Colors.black2,
        fontFamily : Fonts.semiBold,
        flex : 1,
        fontSize : 16,
        flexShrink : 1
    },
    listText : {
        fontSize : 18,
        marginStart : 16,
        fontFamily : Fonts.semiBold,
        color : Colors.black2
    }
})