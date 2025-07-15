import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { MemberNoticeItemList } from "../../constants/MemberNoticeItemList";
import MemberNoticeItem from "../../component/notice/MemberNoticeItem";
import { CompositeScreenProps } from "@react-navigation/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { HomeStackParamList } from "../../navigation/HomeStack";
import { RootStackParamList } from "../../navigation/RootStack";
import { StackScreenProps } from "@react-navigation/stack";

export type MatchScreenProps = CompositeScreenProps<
    BottomTabScreenProps<HomeStackParamList, 'Match'>,
    StackScreenProps<RootStackParamList>
>

export default function MatchScreen({navigation} : MatchScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={{padding : 16}}
                data={MemberNoticeItemList}
                contentContainerStyle={{gap : 16}}
                renderItem={({item}) => (
                    <MemberNoticeItem
                        id={item.id}
                        img={item.img}
                        location={item.location}
                        workHistory={item.workHistory}
                        category={item.category}
                        title={item.title}
                        hashTags={item.hashTags}
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
})