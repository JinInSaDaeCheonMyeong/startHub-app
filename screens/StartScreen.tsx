import {StackScreenProps} from "@react-navigation/stack";
import {AuthStackParamList} from "../navigation/AuthStack";
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import {Colors} from "../constants/Color";
import React from "react";
import BackButton from "../component/BackButton";
import useGoogleLogin from "../hooks/useGoogleLogin";

type WelcomeScreenProps = StackScreenProps<AuthStackParamList, 'Start'>;

export default function StartScreen({navigation}: WelcomeScreenProps) {
    const { request, promptAsync } = useGoogleLogin( isFirst => {
            if (isFirst){
                //정보입력창 이동
            }
            else {
                //메인이동
            }
        }
    );

    const authItems = [
        {
            title: 'StartHub',
            icon: require('../assets/logos/starthub_logo.png'),
            onPress: async () => {
                await navigation.navigate("Signin")
            }
        },
        {
            title: 'Google',
            icon: require('../assets/logos/google_logo.png'),
            onPress: async () => {
                await promptAsync();
            },
            request: request
        },
        {
            title: 'Naver',
            icon: require('../assets/logos/naver_logo.png'),
            onPress: async () => {}
        },
        {
            title: 'Apple',
            icon: require('../assets/logos/apple_logo.png'),
            onPress: async () => {}
        }
    ];
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                            <TouchableOpacity style={styles.authItem} key={index} onPress={item.onPress} disabled={!!item.request}>
                                <Image source={item.icon} style={styles.itemIcon}/>
                                <Text style={styles.itemText}>{item.title}로 시작</Text>
                            </TouchableOpacity>
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
        margin : 16
    },
    backButton: {
        marginTop: 22,
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