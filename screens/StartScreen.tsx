import {StackScreenProps} from "@react-navigation/stack";
import {AuthStackParamList} from "../navigation/AuthStack";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image} from "react-native";
import {Colors} from "../constants/color";
import React from "react";
import BackButton from "../component/BackButton";

type WelcomeScreenProps = StackScreenProps<AuthStackParamList, 'Start'>;

const authItems = [
    {
        title: 'StartHub',
        icon: require('../assets/logos/starthub_logo.png'),
        onPress: () => {}
    },
    {
        title: 'Google',
        icon: require('../assets/logos/google_logo.png'),
        onPress: () => {}
    },
    {
        title: 'Naver',
        icon: require('../assets/logos/naver_logo.png'),
        onPress: () => {}
    },
    {
        title: 'Apple',
        icon: require('../assets/logos/apple_logo.png'),
        onPress: () => {}
    }
];

export default function StartScreen({navigation}: WelcomeScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
            <View style={styles.backButton}>
                <BackButton onClick={() => navigation.goBack()} width={20} height={20} color={Colors.black2}/>
            </View>
            <Text style={styles.topText}>
                안녕하세요!{"\n"}계정을{" "}
                <Text style={{color: Colors.primary}}>
                    선택
                </Text>
                해주세요.
            </Text>
            <View style={styles.itemContainer}>
                {
                    authItems.map((item, index) => (
                        <View style={styles.authItem} key={index}>
                            <Image source={item.icon} style={styles.itemIcon}/>
                            <Text style={styles.itemText}>{item.title}로 시작</Text>
                        </View>
                    ))
                }
            </View>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    backButton: {
        marginLeft: 16,
        marginTop: 22,
        alignItems: 'flex-start',
    },
    topText: {
        marginTop: 74,
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.black2,
    },
    authItem: {
        height: 60,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Colors.gray3,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    itemContainer: {
      marginTop: 68,
    },
    itemIcon: {
        width: 20,
        height: 20,
        marginLeft: 22,
        resizeMode: 'contain'
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'medium',
        textAlign: 'center',
        color: Colors.black2,
        marginRight: 42,
    },
})