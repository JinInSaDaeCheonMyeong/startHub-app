import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthStorage = {
    ACCESS_TOKEN : "accessToken",
    REFRESH_TOKEN : "refreshToken"
} as const

export function SaveAccToken(accToken:string){
    AsyncStorage.setItem(AuthStorage.ACCESS_TOKEN, accToken)
}

export function GetAccToken(){
    return AsyncStorage.getItem(AuthStorage.ACCESS_TOKEN)
}

export function SaveRefToken(refToken:string){
    AsyncStorage.setItem(AuthStorage.REFRESH_TOKEN, refToken)
}

export function GetRefToken(){
    return AsyncStorage.getItem(AuthStorage.REFRESH_TOKEN)
}