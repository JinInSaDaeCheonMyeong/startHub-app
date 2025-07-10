import {FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SearchBar from "../../component/home/SearchBar";
import { Shadow } from "react-native-shadow-2";
import { Colors } from "../../constants/Color";
import { Fonts } from "../../constants/Fonts";
import {PaperProvider } from "react-native-paper";
import { ChatMenuButton } from "../../component/home/ChatMenuButton";
import { dummyChatRommList } from "../../constants/dummy/ChatDummy";
import { getDateDifference } from "../../util/dateFormat";
import { ChatRoomType } from "../../type/chat/chatRoom.type";

export default function ChatScreen() {

    const chatRoomListSort = (list : ChatRoomType[]) => 
    [...list].sort((a, b) => b.date.getTime() - a.date.getTime())

    return (
        <PaperProvider>
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.searchContainer}>
                <SearchBar onPress={(text : string) => {console.log(text)}}/>
            </View>
            <View style={styles.chatWrapper}>
                <Shadow
                    distance={4} 
                    offset={[0, 4]} 
                    startColor="rgba(185, 185, 185, 0.2)"
                    style={styles.shadowStyle}
                >
                    <View style={styles.chatContainer}>
                        <Text style={styles.mainText}>내 채팅</Text>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={chatRoomListSort(dummyChatRommList)}
                                contentContainerStyle={{gap : 16}}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={() => {console.log(item.id)}}>
                                    <View 
                                        style={styles.chatRoomContainer}
                                        key={item.id}
                                    >
                                        <Image 
                                            style={{
                                                width : 48, 
                                                height : 48,
                                                borderRadius : 8
                                            }}
                                            source={{uri : item.img}}
                                        />
                                        <View style={styles.chatInfoContainer}>
                                            <Text 
                                                style={styles.userText}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {item.userName}
                                            </Text>
                                            <Text style={styles.msgText}>
                                                {item.lastMsg}
                                            </Text>
                                        </View>
                                        <View style={styles.menuContainer}>
                                            <Text style={styles.dateText}>      
                                                {getDateDifference(item.date)}                       
                                            </Text>
                                            <ChatMenuButton
                                                onDelete={() => {console.log("삭제하기")}}
                                            />
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                </Shadow>
            </View>
        </SafeAreaView>
        </PaperProvider>
    )

}

const styles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        flexDirection: 'column',
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    chatWrapper: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    shadowStyle: {
        width: "100%",
    },
    chatContainer : {
        flexDirection: 'column',
        borderRadius : 8,
        backgroundColor : Colors.white1,
        gap : 16,
        padding : 16,
        maxHeight : "100%"
    },
    chatRoomContainer : {
        flexDirection : 'row',
        width : "100%",
        justifyContent : 'space-between',
        gap : 8
    },
    chatInfoContainer : {
        paddingVertical : 4,
        flex : 1,
        gap : 4
    },
    dateMenuContainer : {
        paddingVertical : 4
    },
    menuContainer : {
        paddingVertical : 4,
        justifyContent : "space-between",
        alignItems : "flex-end"
    },
    mainText : {
        fontFamily : Fonts.semiBold,
        fontSize : 16,
        color : Colors.gray1
    },
    userText : {
        fontFamily : Fonts.bold,
        fontSize : 14,
        color : Colors.gray1
    },
    msgText : {
        fontFamily : Fonts.medium,
        fontSize : 12,
        color : Colors.gray2
    },
    dateText : {
        fontFamily : Fonts.medium,
        fontSize : 12,
        color : Colors.gray2
    }
})