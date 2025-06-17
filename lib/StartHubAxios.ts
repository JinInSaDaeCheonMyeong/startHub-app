import axios from "axios";
import { getAccToken,} from "../util/token";


const StartHubAxios = axios.create({
    baseURL : process.env.EXPO_PUBLIC_API_URL,
    timeout : 5000,
})

StartHubAxios.interceptors.request.use(async (config) => {
    const token = await getAccToken()
    if (!!token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

StartHubAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response?.status === 401){
        }
        return Promise.reject(error);
    }
)

export default StartHubAxios