import {SafeAreaView, StyleSheet, Text, View} from "react-native";

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>home</Text>
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