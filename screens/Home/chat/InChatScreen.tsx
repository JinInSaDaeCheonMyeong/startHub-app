import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import InChatHeaderBar from "../../../component/home/InChatHeaderBar";
import { RootStackParamList } from "../../../navigation/RootStack";

type InChatScreenProps = StackScreenProps<RootStackParamList, 'InChat'>;

export default function InChatScreen({navigation, route : {params}} : InChatScreenProps) {
    return (
        <SafeAreaView>
            <FlatList
                ListHeaderComponent={(
                    <InChatHeaderBar
                        img={params.img}
                        name={params.name}
                        affiliation={params.affiliation}
                        backClick={() => {navigation.goBack()}}
                        menuClick={() => {console.log("menu")}}
                    />
                )}
                ListFooterComponent={(
                    <View>
                        <Text>footer</Text>
                    </View>
                )}
                data={['1','2','3']}
                renderItem={(item) => (
                    <View>
                        <Text>item</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})