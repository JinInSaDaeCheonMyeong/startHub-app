import axios, { AxiosError } from "axios";
import { getAccToken, getRefToken, removeTokens, saveAccToken, saveRefToken } from "../util/token";
import { refresh } from "../api/user";
import { BackHandler, Platform } from "react-native";

const StartHubAxios = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 5000,
});

StartHubAxios.interceptors.request.use(
    async (config) => {
        const token = await getAccToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

StartHubAxios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/user/refresh")
        ) {
            originalRequest._retry = true;
            try {
                const refreshData = await getRefToken();
                if (!refreshData) throw new Error("No refresh token");
                const {
                    data: { access: accessToken, refresh: refreshToken }
                } = await refresh({ refresh: refreshData });
                await saveAccToken(accessToken);
                await saveRefToken(refreshToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return StartHubAxios(originalRequest);
            } catch (error) {
                await removeTokens();
                Platform.select({
                    ios: () => console.log("exit"),
                    android: () => BackHandler.exitApp()
                });
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default StartHubAxios;