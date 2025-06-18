import {SafeAreaView, StyleSheet, Text, View} from "react-native";

export default function MatchScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Match</Text>
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