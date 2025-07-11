import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import InChatHeaderBar from "../../../component/home/InChatHeaderBar";
import { RootStackParamList } from "../../../navigation/RootStack";
import InChatFooterBar from "../../../component/home/InChatFooterBar";
import { useInChatScreen } from "../../../hooks/home/useInChatScreen";

type InChatScreenProps = StackScreenProps<RootStackParamList, 'InChat'>;

export default function InChatScreen({navigation, route : {params}} : InChatScreenProps) {

    const {
        msgs, 
        sendMessage
    } = useInChatScreen(params.roomId)

    return (
        <SafeAreaView style={styles.mainContainer}>
            <InChatHeaderBar
                img={params.img}
                name={params.name}
                affiliation={params.affiliation}
                backClick={() => {navigation.goBack()}}
                menuClick={() => {console.log("menu")}}
            />
            <FlatList
                data={msgs}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.message}</Text>
                    </View>
                )}
            />
            <InChatFooterBar
                onPress={(value) => {sendMessage(value)}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1
    }
})