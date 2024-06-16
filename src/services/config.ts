import axios from "axios";
import * as SecureStore from 'expo-secure-store'
export const BASE_URL = "http://localhost:1337/"
const TIME_OUT = 30000
export const TO_DO_APP_TOKEN_NAME = "toDoApp_user_token"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
})

export const saveToken = async (key: string, value: string) => {
    try {
        await SecureStore.setItemAsync(key, value)
    } catch (error) {
        console.log("error in save token")
        throw error
    }
}


axiosInstance.interceptors.request.use(async (req) => {
    try {
        const access_token = await SecureStore.getItemAsync(TO_DO_APP_TOKEN_NAME)
        return req
    } catch (error) {
        return req
    }
})
export const fetcher = (url: string) =>
    axiosInstance.get(url).then((res) => res.data)
export default axiosInstance