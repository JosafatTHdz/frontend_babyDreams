import { isAxiosError } from "axios"
import api from "../config/axios"
import { User } from "../types"

export async function getUser() {
    try {
        const { data } = await api<User>('/user')
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
        throw new Error(error.response.data.error)
    }
}

export async function updateProfile(formData: User) {
    try {
        const { data } = await api.patch<string>('/user', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
    }
}