import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, useWindowDimensions, View, Image } from "react-native";
import InChatHeaderBar from "../../../component/home/InChatHeaderBar";
import { RootStackParamList } from "../../../navigation/RootStack";
import InChatFooterBar from "../../../component/home/InChatFooterBar";
import { useInChatScreen } from "../../../hooks/home/useInChatScreen"
import { formatToDate, formatToTime } from "../../../util/DateFormat";
import { Colors } from "../../../constants/Color";
import { Fonts } from "../../../constants/Fonts";
import { useEffect, useMemo, useRef } from "react";


type InChatScreenProps = StackScreenProps<RootStackParamList, 'InChat'>;

export default function InChatScreen({navigation, route : {params}} : InChatScreenProps) {
    const { width } = useWindowDimensions();
    const { msgs, sendMessage, senderId } = useInChatScreen(params.roomId, params.chatLst);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (msgs.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            }, 100);
        }
    }, [msgs]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                if (msgs.length > 0) {
                    setTimeout(() => {
                        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
                    }, 100);
                }
            }
        );
        return () => {
            keyboardDidShowListener.remove();
        };
    }, [msgs.length]);

    const reversedMsgs = useMemo(() => [...msgs].reverse(), [msgs]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <InChatHeaderBar
                img={params.img}
                name={params.name}
                affiliation={params.affiliation}
                backClick={() => navigation.goBack()}
                menuClick={() => console.log("menu")}
            />
            <FlatList
                ref={flatListRef}
                data={reversedMsgs}
                keyExtractor={(item, idx) => item.id?.toString() ?? idx.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                inverted
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                onScrollToIndexFailed={(info) => {
                    setTimeout(() => {
                        flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                    }, 500);
                }}
                renderItem={({item, index}) => {
                    const prev = reversedMsgs[index - 1];
                    const next = reversedMsgs[index + 1];
                    const showDate = !next || formatToDate(next.sentAt) !== formatToDate(item.sentAt);
                    const showTime = !prev || formatToTime(prev.sentAt) !== formatToTime(item.sentAt) || prev.senderId !== item.senderId;
                    const isMine = senderId && item.senderId === senderId;
                    const showProfile = !isMine && (!next || next.senderId !== item.senderId || showDate)
                    return (
                        <>
                            <View style={[styles.messageRow, isMine ? styles.myRow : styles.otherRow]}>
                                {showTime && (
                                    <Text style={styles.timeText}>{formatToTime(item.sentAt)}</Text>
                                )}
                                <View style={[styles.bubble, isMine ? styles.myBubble : styles.otherBubble, { maxWidth: width / 2 - 16 }]}>
                                    <Text style={[styles.messageText, isMine ? styles.myText : styles.otherText]}>
                                        {item.message}
                                    </Text>
                                </View>
                            </View>
                            {showProfile && (
                                <View style={{flexDirection : "row", alignItems : "center", gap : 4}}>
                                    <Image source={{uri : params.img}} style={{width: 34, height: 34, borderRadius: 16}} />
                                    <Text style={{fontFamily : Fonts.semiBold, fontSize : 14, color : Colors.gray2}}>{params.name}</Text>
                                </View>
                            )}
                            {showDate && (
                                <View style={{
                                    flexDirection : "row", 
                                    justifyContent : "space-between", 
                                    alignItems: "center", 
                                    gap : 12,
                                    marginVertical: 24 }
                                }>
                                    <View style={{borderStyle : "solid", borderBottomColor : Colors.gray3, borderWidth : 0.5, height : 0, flex : 1}}/>
                                    <Text style={{ fontSize: 14, color: Colors.gray3, fontFamily: Fonts.semiBold }}>
                                        {formatToDate(item.sentAt)}
                                    </Text>
                                    <View style={{borderStyle : "solid", borderBottomColor : Colors.gray3, borderWidth : 0.5, height : 0, flex : 1}}/>
                                </View>
                            )}
                        </>
                    );
                }}
            />
            <InChatFooterBar onPress={sendMessage} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white1,
    },
    listContent: {
        padding: 16,
        gap: 6,
    },
    messageRow: {
        flexDirection: "row",
        gap : 6,
        alignItems: "flex-end",
        justifyContent: "flex-end", // 내 메시지는 오른쪽 정렬
    },
    myRow: {
    },
    otherRow: {
        flexDirection: "row-reverse", 
        justifyContent: "flex-end",  
    },
    bubble: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    myBubble: {
        backgroundColor: Colors.primary,
        borderBottomEndRadius: 0,
    },
    otherBubble: {
        backgroundColor: Colors.white2,
        borderBottomStartRadius: 0,
        marginStart : 34
    },
    messageText: {
        fontSize: 14,
        fontFamily: Fonts.semiBold,
    },
    myText: {
        color: Colors.white1,
    },
    otherText: {
        color: Colors.gray2,
    },
    timeText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: Colors.gray2,
    },
});