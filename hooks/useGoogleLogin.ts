import * as WebBrowser from 'expo-web-browser';
import {makeRedirectUri, useAuthRequest, ResponseType} from 'expo-auth-session';
import { useEffect } from 'react';
import {Platform} from "react-native";
import {googleLogin} from "../api/oauth";
import {ShowToast, ToastType} from "../util/ShowToast";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
};

export default function useGoogleLogin(
    onSuccess?: (isFirst: boolean) => void
) {
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
        const handleResponse = async () => {
            if (response?.type === 'success' && response.params?.code) {
                const isFirst = await googleLogin(response.params.code);
                if (onSuccess && typeof isFirst !== 'undefined') {
                    onSuccess(isFirst);
                }
            } else if (response?.type === 'error') {
                ShowToast(
                    "문제가 발생하였습니다.",
                    response.params.error,
                    ToastType.ERROR,
                )
            }
        };
        handleResponse();
    }, [response]);

    return {
        request,
        promptAsync,
    };
}
