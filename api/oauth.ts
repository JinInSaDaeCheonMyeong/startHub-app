import axios from 'axios';
import Toast from "react-native-toast-message";



export async function getState() {
    try {
        const response = await axios.get('https://your-server.com/api/auth/google');
        return response.data;
    } catch (error: any) {
        Toast.show({
            type: 'error',
            text1: '문제가 발생하였습니다',
            text2: error.message,
        });
    }
}

export async function getGoogleToken(authCode: string) {
    try {
        const response = await axios.post('https://your-server.com/api/auth/google', {
            code: authCode,
        });
        return response.data.accessToken;
    } catch (error: any) {
        console.error('토큰 요청 실패:', error?.response?.data || error.message);
        throw new Error('토큰 요청 실패');
    }
}