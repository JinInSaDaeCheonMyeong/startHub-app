import {SafeAreaView, StyleSheet, Text, View} from "react-native";

export default function BMCScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>BMC</Text>
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