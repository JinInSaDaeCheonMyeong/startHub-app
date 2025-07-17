import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, useWindowDimensions, View, Image, TouchableOpacity } from "react-native";
import InChatHeaderBar from "../../../component/home/InChatHeaderBar";
import { RootStackParamList } from "../../../navigation/RootStack";
import InChatFooterBar from "../../../component/home/InChatFooterBar";
import BottomArrowIcon from "../../../assets/icons/bottom-arrow-back.svg"
import { useInChatScreen } from "../../../hooks/home/useInChatScreen"
import { formatToDate, formatToTime } from "../../../util/DateFormat";
import { Colors } from "../../../constants/Color";
import { Fonts } from "../../../constants/Fonts";
import { useEffect, useMemo, useRef, useState } from "react";
import { Drawer} from 'react-native-drawer-layout';
import { Shadow } from "react-native-shadow-2";

type InChatScreenProps = StackScreenProps<RootStackParamList, 'InChat'>;

export default function InChatScreen({navigation, route : {params}} : InChatScreenProps) {
    const { width } = useWindowDimensions();
    const { msgs, sendMessage, senderId } = useInChatScreen(params.roomId, params.chatLst);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [endReached, setEndReached] = useState(true); // 변수명을 더 명확하게 변경
    const flatListRef = useRef<FlatList>(null);

    // 새 메시지가 추가될 때 자동 스크롤 (마지막에 있을 때만)
    useEffect(() => {
        if (msgs.length > 0 && endReached) {
            setTimeout(() => {
                flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            }, 100);
        }
    }, [msgs.length, endReached]); // endReached 의존성 추가

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                if (msgs.length > 0 && endReached) { // endReached 조건 추가
                    setTimeout(() => {
                        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
                    }, 100);
                }
            }
        );
        return () => {
            keyboardDidShowListener.remove();
        };
    }, [msgs.length, endReached]);

    const reversedMsgs = useMemo(() => [...msgs].reverse(), [msgs]);

    const handleScrollBeginDrag = () => {
        setEndReached(false);
    };

    const handleScrollToBottom = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        setEndReached(true); // 버튼 클릭 시 상태 업데이트
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onOpen={() => setDrawerOpen(true)}
                renderDrawerContent={() => (
                    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingTop: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 20 }}>메뉴</Text>
                        <Text style={{ padding: 20 }}>안녕하세요</Text>
                    </SafeAreaView>
                )}
                drawerPosition="right"
                drawerType="front"
                drawerStyle={{
                    width: width * 0.8,
                    backgroundColor: 'white',
                }}
                overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                swipeEnabled={true}
                swipeEdgeWidth={50}
            >
                <InChatHeaderBar
                    img={params.img}
                    name={params.name}
                    affiliation={params.companyName}
                    backClick={() => navigation.goBack()}
                    menuClick={() => setDrawerOpen(true)}
                />
                <View style={styles.chatContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={reversedMsgs}
                        keyExtractor={(item, idx) => item.id?.toString() ?? idx.toString()}
                        contentContainerStyle={[styles.listContent, {flexGrow : 1, justifyContent : "flex-end"}]}
                        showsVerticalScrollIndicator={false}
                        inverted
                        initialNumToRender={20}
                        maxToRenderPerBatch={20}
                        onEndReachedThreshold={0.1}
                        onScrollBeginDrag={handleScrollBeginDrag}
                        onMomentumScrollEnd={(event) => {
                            const { contentOffset } = event.nativeEvent;
                            if (contentOffset.y <= 100) {
                                setEndReached(true);
                            }
                        }}
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
                                        <View style={[styles.bubble, isMine ? styles.myBubble : styles.otherBubble, { maxWidth: width / 1.5 }]}>
                                            <Text style={[styles.messageText, isMine ? styles.myText : styles.otherText]}>
                                                {item.message}
                                            </Text>
                                        </View>
                                    </View>
                                    {showProfile && (
                                        <View style={styles.profileContainer}>
                                            <Image source={{uri : params.img}} style={styles.profileImage} />
                                            <Text style={styles.profileName}>{params.name}</Text>
                                        </View>
                                    )}
                                    {showDate && (
                                        <View style={styles.dateContainer}>
                                            <View style={styles.dateLine}/>
                                            <Text style={styles.dateText}>
                                                {formatToDate(item.sentAt)}
                                            </Text>
                                            <View style={styles.dateLine}/>
                                        </View>
                                    )}
                                </>
                            );
                        }}
                    />
                    {!endReached && (
                        <TouchableOpacity 
                            style={styles.scrollButton}
                            onPress={handleScrollToBottom}
                            activeOpacity={0.7}
                        >
                            <Shadow
                                distance={4} 
                                offset={[0, 4]}
                                startColor="rgba(185, 185, 185, 0.2)"
                            >
                                <View style={styles.scrollButtonInner}>
                                    <BottomArrowIcon
                                        width={18}
                                        height={18}
                                        color={Colors.black2}
                                    />
                                </View>
                            </Shadow>
                        </TouchableOpacity>
                    )}
                </View>
                <InChatFooterBar onPress={sendMessage} />
            </Drawer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white1,
    },
    chatContainer: {
        flex: 1,
        position: "relative"
    },
    listContent: {
        gap: 12,
        paddingHorizontal : 16,
        paddingTop : 16
    },
    messageRow: {
        flexDirection: "row",
        gap: 6,
        alignItems: "flex-end",
        justifyContent: "flex-end",
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
        marginStart: 34
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
    profileContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        gap: 4
    },
    profileImage: {
        width: 34, 
        height: 34, 
        borderRadius: 16
    },
    profileName: {
        fontFamily: Fonts.semiBold, 
        fontSize: 14, 
        color: Colors.gray2
    },
    dateContainer: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        gap: 12,
        marginVertical: 24
    },
    dateLine: {
        borderStyle: "solid", 
        borderColor: Colors.gray3,
        borderWidth: 0.5, 
        height: 0, 
        flex: 1
    },
    dateText: {
        fontSize: 14, 
        color: Colors.gray3, 
        fontFamily: Fonts.semiBold
    },
    scrollButton: {
        position: "absolute",
        bottom: 12,
        right: 12,
        borderRadius: 24
    },
    scrollButtonInner: {
        padding: 16, 
        backgroundColor: Colors.white1,
        borderRadius: 24
    },
});