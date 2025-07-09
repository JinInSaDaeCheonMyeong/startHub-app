import {FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SearchBar from "../../component/home/SearchBar";
import { Shadow } from "react-native-shadow-2";
import { Colors } from "../../constants/Color";
import { Fonts } from "../../constants/Fonts";
import { Menu, PaperProvider } from "react-native-paper";
import { ChatMenuButton } from "../../component/home/ChatMenuButton";

export default function ChatScreen() {
    return (
        <PaperProvider>
        <SafeAreaView style={styles.mainContainer}>
            <SearchBar onPress={(text : string) => {console.log(text)}}/>
            <Shadow
                distance={4} 
                offset={[0, 4]} 
                startColor="rgba(185, 185, 185, 0.2)"
                style={{
                    width : "100%"
                }}
            >
                <View style={styles.chatContainer}>
                    <Text style={styles.mainText}>내 채팅</Text>
                    <FlatList
                        data={["1", "2", "3", "4", "", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3"]}
                        contentContainerStyle={{gap : 16}}
                        renderItem={({item}) => (
                            <TouchableOpacity>
                            <View style={styles.chatRoomContainer}>
                                <Image 
                                    style={{
                                        width : 48, 
                                        height : 48,
                                        borderRadius : 8
                                    }}
                                    source={{uri : "https://www.gstatic.com/lamda/images/gemini_thumbnail_v2_55a4e3be7b83404a620e5.jpg"}}
                                />
                                <View style={styles.chatInfoContainer}>
                                    <Text 
                                        style={styles.userText}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        Dummy User Name
                                    </Text>
                                    <Text style={styles.msgText}>
                                        Dummy Message
                                    </Text>
                                </View>
                                <View style={styles.menuContainer}>
                                    <Text style={styles.dateText}>      
                                        Dummy Date                          
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
        </SafeAreaView>
        </PaperProvider>
    )

}
const styles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        flexDirection: 'column',
        margin : 16,
        gap : 16
    },
    chatContainer : {
        flex : 1,
        borderRadius : 8,
        backgroundColor : Colors.white1,
        gap : 16,
        padding : 16
    },
    chatRoomContainer : {
        flexDirection : 'row',
        flex : 1,
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