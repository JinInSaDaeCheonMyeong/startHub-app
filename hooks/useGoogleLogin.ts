import * as WebBrowser from 'expo-web-browser';
import {makeRedirectUri, useAuthRequest, ResponseType} from 'expo-auth-session';
import { useEffect } from 'react';
import {Platform} from "react-native";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
};

export default function useGoogleLogin() {
    const redirectUri = makeRedirectUri({scheme: 'com.jininsa.startHubapp',});
    const clientId = Platform.select({
        ios: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
        android: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID
    })
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: clientId,
            redirectUri,
            responseType: ResponseType.Code,
            scopes: ['openid', 'profile', 'email'],
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success' && response.params?.code) {
            console.log('Successfully logged in', response.params.code);
        } else if (response?.type === 'error') {
            console.log('Error logged in', response);
        }
    }, [response]);

    return {
        request,
        promptAsync,
    };
}
