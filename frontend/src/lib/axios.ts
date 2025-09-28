import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})



axiosInstance.interceptors.response.use(
    (respones) => respones,
    (error) => {
        if (axios.isAxiosError(error) && error.response?.data.message !== "Unauthorized: No token provided.") {
            toast.error(error.response?.data.message || "Something went wrong");
        }
        return Promise.reject(error)
    }
)