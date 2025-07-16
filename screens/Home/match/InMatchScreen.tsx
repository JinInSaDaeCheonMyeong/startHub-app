import { useCallback, useState } from "react";
import { View, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; 
import { GetDetailRecruitResponse } from "../../../type/notice/recruits.type";
import { isAxiosError } from "axios";
import { ShowToast, ToastType } from "../../../util/ShowToast";
import { getDetailRecruits } from "../../../api/recruits";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/RootStack";
import { ErrorResponse } from "../../../type/util/response.type";
import BackButton from "../../../component/BackButton";
import BookMarkIcon from "../../../assets/icons/bookMark/bookmark.svg";
import BookMarkFillIcon from "../../../assets/icons/bookMark/bookmark.fill.svg";
import { Colors } from "../../../constants/Color";
import { formatToDate } from "../../../util/DateFormat";
import CommonButton from "../../../component/CommonButton";
import { Fonts } from "../../../constants/Fonts";
import { useFocusEffect } from "@react-navigation/core";
import { getUser } from "../../../api/user";
import { getCompanyById } from "../../../api/company";
import { createRoom, getMessages } from "../../../api/chat";

type InMatchScreenProps = StackScreenProps<RootStackParamList, "InMatch">;

export default function InMatchScreen({ navigation, route: { params } }: InMatchScreenProps) {
    const [matchData, setMatchData] = useState<GetDetailRecruitResponse["data"]>();
    const [select, setSelect] = useState(false);
    const insets = useSafeAreaInsets(); 

    const getData = async () => {
        try {
        const data = (await getDetailRecruits(params.matchId)).data;
        setMatchData(data);
        } catch (error: unknown) {
        if (isAxiosError(error)) {
            const response = error.response;
            if (!response) {
            ShowToast("오류 발생", "네트워크 오류가 발생하였습니다", ToastType.ERROR);
            } else {
            const errorData = response.data as ErrorResponse;
            ShowToast("오류 발생", errorData.message, ToastType.ERROR);
            }
        } else {
            ShowToast("오류 발생", "알 수 없는 오류가 발생했습니다", ToastType.ERROR);
        }
        }
    };

    useFocusEffect(useCallback(() => {
        getData();
    }, []));

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" translucent />
            <View style={styles.headerContainer}>
            <BackButton
                width={24}
                height={24}
                color={Colors.white1}
                onClick={() => navigation.goBack()}
            />
            <View style={styles.headerContent}>
                <Text style={styles.headerTitle}>{matchData?.jobType}</Text>
                <TouchableOpacity onPress={() => setSelect((prev) => !prev)}>
                {select ? (
                    <BookMarkFillIcon width={24} height={24} color={Colors.white1} />
                ) : (
                    <BookMarkIcon width={24} height={24} color={Colors.white1} />
                )}
                </TouchableOpacity>
            </View>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                <View style={styles.companySection}>
                    <View style={styles.companyRow}>
                        <Text style={styles.companyName}>{matchData?.companyName}</Text>
                        <Text style={styles.companyDate}>
                        {formatToDate(`${matchData?.updatedAt}`)}
                        </Text>
                    </View>
                    <Text style={styles.recruitTitle}>
                        [{matchData?.workType}] {matchData?.title}
                    </Text>
                </View>
                <View style={styles.textBox}>
                <Text
                    style={[
                    styles.boxTitle,
                    {
                        color: matchData?.isClosed ? Colors.error : Colors.black2,
                        textDecorationLine: matchData?.isClosed ? "line-through" : "none"
                    }
                    ]}
                >
                    모집기간
                </Text>
                    <Text
                        style={[
                        styles.boxContent,
                        {
                            color: matchData?.isClosed ? Colors.error : Colors.black2,
                            textDecorationLine: matchData?.isClosed ? "line-through" : "none"
                        }
                        ]}
                    >
                        모집 : {formatToDate(`${matchData?.startDate}`)} ~{" "}
                        {formatToDate(`${matchData?.endDate}`)}
                    </Text>
                </View>

                <View style={styles.textBox}>
                    <Text style={styles.boxTitle}>기술 스택</Text>
                    <Text style={styles.boxContent}>{matchData?.techStack.join(', ')}</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.boxTitle}>모집 인원</Text>
                    <Text style={styles.boxContent}>{matchData?.requiredPeople}명</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.boxTitle}>세부 내용</Text>
                    <Text style={styles.boxContent}>{matchData?.content}</Text>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.boxTitle}>우대사항</Text>
                    <Text style={styles.boxContent}>{matchData?.desiredCareer}</Text>
                </View>
            </ScrollView>

            <View style={[styles.bottomButton, { paddingBottom: insets.bottom + 16 }]}>
            <CommonButton
                title={matchData?.isClosed ? "매칭 마감됨" : "스타트업 매칭하기"}
                disabled={matchData?.isClosed ?? false}
                onPress={ async() => {
                    if(!matchData) return
                    try {
                        const id = (await getUser()).data.id
                        const roomId = (await createRoom(id, matchData.companyId)).data.id
                        console.log(roomId)
                        const companyImg = (await getCompanyById(matchData.companyId)).data.logoImage
                        const chatList = (await getMessages(roomId)).data
                        navigation.navigate("InChat", 
                            {
                                roomId : roomId, 
                                chatLst : chatList, 
                                name : matchData.writerNickname, 
                                affiliation : matchData.companyName, 
                                img : companyImg
                            }
                        )
                    } catch (error : unknown) {
                        if(isAxiosError(error)){
                            const response = error.response
                            if(!response) {
                                ShowToast("오류 발생", "네트워크 오류가 발생했습니다", ToastType.ERROR)
                                return
                            }
                            const data = response.data as ErrorResponse
                            ShowToast("오류 발생", data.message, ToastType.ERROR)
                            return
                        }
                        ShowToast("오류 발생", "알 수 없는 오류가 발생하였습니다", ToastType.ERROR)
                        console.log(error)
                        return
                    }
                }}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary, 
    },
    headerContainer: {
        padding: 16,
        backgroundColor: Colors.primary,
        gap: 16,
    },
    headerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        color: Colors.white1,
        fontFamily: Fonts.bold,
        fontSize: 16,
    },
    scroll: {
        flex: 1,
        backgroundColor: Colors.white1,
    },
    scrollContent: {
        padding: 16,
        gap: 24,
    },
    bottomButton: {
        paddingHorizontal: 16,
        backgroundColor: Colors.white1,
    },
    companySection: {
        gap: 8
    },
    companyRow: {
        flexDirection: "row",
        gap: 8,
        alignItems: "flex-end"
    },
    companyName: {
        fontFamily: Fonts.medium,
        color: Colors.black2,
        fontSize: 16
    },
    companyDate: {
        fontFamily: Fonts.medium,
        color: Colors.gray2,
        fontSize: 14
    },
    recruitTitle: {
        fontFamily: Fonts.bold,
        color: Colors.black2,
        fontSize: 20
    },
    textBox: {
        gap: 6
    },
    boxTitle: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: Colors.black2
    },
    boxContent: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: Colors.black2
    }
});
