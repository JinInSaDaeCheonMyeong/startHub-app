import {FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import HeaderBar from "../../component/HeaderBar";
import { Colors } from "../../constants/Color";
import { Fonts } from "../../constants/Fonts";
import { Shadow } from "react-native-shadow-2";
import BMCNote from "../../assets/icons/bmc_note.svg"
import NoticeItem from "../../component/notice/NoticeItem";
import { NoticeItemList } from "../../constants/NoticeItemList";
import MemberNoticeItem from "../../component/notice/MemberNoticeItem";
import { MemberNoticeItemList } from "../../constants/MemberNoticeItemList";
import Spacer from "../../component/Spacer";

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <HeaderBar 
                    onClickBellIcon={() => {}}
                    onClickSystemIcon={() => {}}
                />
                <Spacer height={16}/>
                <TouchableOpacity onPress={() => {console.log("안녕")}}>
                    <View style={styles.imminentContainer}>
                        <Text style={styles.imminentText}>마감임박</Text>
                        <Text 
                            style={styles.imminentTitleText}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {'[아산나눔재단]어쩌고저쩌고쌸라fdsafsdafㄴㅇㄹㄴㄴsadsfad'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <Spacer height={16}/>
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
                <Spacer height={16}/>
                <View style={[commonContainer.container, styles.flatListContainer]}>
                    <Text style={styles.listText}>추천 공고</Text>
                    <FlatList
                        contentContainerStyle={{gap : 16, paddingHorizontal : 16, paddingBottom : 16 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
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
                        data={MemberNoticeItemList}
                        renderItem={({item}) => (
                            <MemberNoticeItem
                                id={item.id}
                                img={item.img}
                                location={item.location}
                                workHistory={item.workHistory}
                                category={item.category}
                                title={item.title}
                                hashTags={item.hashTags}
                                isHome={true}
                                onPress={() => {console.log("안녕")}}
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
    imminentContainer : {
        marginTop : 16,
        marginHorizontal : 16,
        flexDirection : 'row',
        gap : 16,
        paddingVertical : 12,
        paddingHorizontal : 16,
        borderColor : Colors.error,
        borderWidth : 1,
        borderStyle : "solid",
        borderRadius : 8,
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
    imminentText : {
        color : Colors.error,
        fontFamily : Fonts.bold,
        fontSize : 14
    },
    imminentTitleText : {
        color : Colors.black2,
        fontFamily : Fonts.medium,
        flex : 1,
        flexShrink : 1,
        fontSize : 14
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