
import { IUser } from "../types";
import axiosInstance, { TO_DO_APP_TOKEN_NAME, saveToken } from "./config";

type RegisterUserTypes = IUser

export const registerUser = async ({
    email,
    name,
    password,
}: RegisterUserTypes) => {
    try {
        const response = await axiosInstance.post("/user/create", {
            email,
            password,
            name
        })
        return response.data.user
    } catch (error) {
        console.log("error in register user", error)
        throw error
    }
}

type LoginUserTypes = Omit<IUser, "name">


export const loginUser = async ({ email, password }: LoginUserTypes) => {
    try {
        const response = await axiosInstance.post("/user/login", {
            email,
            password,

        })
        const _token = response.data.token
        axiosInstance.defaults.headers.common["Authorization"] = _token
        saveToken(TO_DO_APP_TOKEN_NAME, _token)
        return response.data.user
    } catch (error) {
        console.log("error in loginUser", error)
        throw error
    }
}