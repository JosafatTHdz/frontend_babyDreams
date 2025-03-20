import { isAxiosError } from "axios"
import api from "../config/axios"
import { User } from "../types"
import { About } from "../types/about"

//User
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

export const logoutUser = async () => {
    localStorage.removeItem("AUTH_TOKEN")
}

//Product
export const getProducts = async () => {
    try {
        const { data } = await api.get("/product")
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response)
        throw new Error(error.response.data.error)
    }
}

export const getProduct = async (productId: string) => {
    try {
        const { data } = await api.get(`/product/${productId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
        throw new Error(error.response.data.error)
    }
}

export const deleteProduct = async (productId: string) => {
    try {
        const { data } = await api.delete(`/product/${productId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
        throw new Error(error.response.data.error)
    }
}

//Category
export const getCategories = async () => {
    try {
        const { data } = await api.get("/product/category")
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
        throw new Error(error.response.data.error)
    }
}

export const getProductsByCategory = async (categoryId: string) => {
    try {
        const { data } = await api.get(`/product/category/${categoryId}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)
        throw new Error(error.response.data.error)
    }
}

//About
export const getAbout = async () => {
    try {
        const { data } = await api.get("/about")
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response)  
        throw new Error(error.response.data.error)
    }
}

export const updateAbout = async (formData: About) => {
    try {
        const { data } = await api.patch<string>('/about/update', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteAbout = async () => {
    try {
        const { data } = await api.delete('/about/delete')
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log(error.response.data.error)
            throw new Error(error.response.data.error)
        }
    }
}