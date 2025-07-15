import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import { getRecruitsList } from "../../../api/recruits";
import { ShowToast, ToastType } from "../../../util/ShowToast";
import { isAxiosError } from "axios";
import RecruitsItem from "../../../component/notice/RecruitsItem";
import { HomeStackParamList } from "../../../navigation/HomeStack";
import { RootStackParamList } from "../../../navigation/RootStack";
import { RecruitsItemType } from "../../../type/notice/recruits.type";
import { ErrorResponse } from "../../../type/util/response.type";
import { Colors } from "../../../constants/Color";
import { Fonts } from "../../../constants/Fonts";

export type MatchScreenProps = CompositeScreenProps<
    BottomTabScreenProps<HomeStackParamList, "Match">,
    StackScreenProps<RootStackParamList>
>;

export default function MatchScreen({ navigation }: MatchScreenProps) {
    const [recruitsItems, setRecruitsItems] = useState<RecruitsItemType[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(0);

    const getRecruitsItems = async () => {
        if (isFetching) return;
        setIsFetching(true);

        try {
        const response = (await getRecruitsList(page, 10)).data;

        if (response.empty) {
            setIsFetching(false);
            return;
        }

        setPage(prev => prev + 1);

        setRecruitsItems(prev => {
            const map = new Map(prev.map(item => [item.id, item]));

            response.content.forEach(item => {
            const prevItem = map.get(item.id);
            const isDifferent =
                !prevItem ||
                prevItem.title !== item.title ||
                prevItem.companyName !== item.companyName ||
                prevItem.endDate !== item.endDate ||
                prevItem.viewCount !== item.viewCount ||
                prevItem.isClosed !== item.isClosed ||
                prevItem.createdAt !== item.createdAt;

            if (isDifferent) {
                map.set(item.id, item);
            }
            });

            const ordered = [...prev.filter(i => map.has(i.id)).map(i => map.get(i.id)!), 
                ...response.content.filter(i => !prev.find(p => p.id === i.id))];
            return ordered;
        });
        } catch (error: unknown) {
        const errMsg = isAxiosError(error)
            ? error.response
            ? (error.response.data as ErrorResponse).message
            : "네트워크 오류가 발생했습니다"
            : "알 수 없는 오류가 발생했습니다";
        ShowToast("오류 발생", errMsg, ToastType.ERROR);
        } finally {
        setIsFetching(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
        getRecruitsItems();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>매칭</Text>
        <FlatList
            style={styles.list}
            data={recruitsItems}
            contentContainerStyle={styles.content}
            onEndReachedThreshold={0.2}
            onEndReached={getRecruitsItems}
            renderItem={({ item }) => (
            <RecruitsItem
                {...item}
                isHome={false}
                onPress={id => navigation.navigate("InMatch", { matchId: id })}
            />
            )}
        />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        color: Colors.black2,
        fontFamily: Fonts.semiBold,
        fontSize: 18,
        margin: 16,
    },
    list: {
        paddingHorizontal: 16,
    },
    content: {
        gap: 16,
    },
});
