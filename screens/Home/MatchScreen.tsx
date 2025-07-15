import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { MemberNoticeItemList } from "../../constants/MemberNoticeItemList";
import MemberNoticeItem from "../../component/notice/MemberNoticeItem";

export default function MatchScreen() {
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
                        onPress={() => {console.log("안녕")}}
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