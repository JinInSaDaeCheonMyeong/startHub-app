import {SafeAreaView, StyleSheet, Text, View} from "react-native";

export default function NoticeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Notice</Text>
            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
})