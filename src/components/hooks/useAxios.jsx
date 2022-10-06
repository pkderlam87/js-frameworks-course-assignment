import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const url = process.env.REACT_APP_BASE_URL;
/**
 * This is a reusable hook function to put token in the headers   
 * @returns token
 */

export default function useAxios() {
    //This useContext provider the token for authenticated users
    const [auth] = useContext(AuthContext);
    const apiClient = axios.create({
        baseURL: url,
    });
    apiClient.interceptors.request.use(function (config) {
        const token = auth.token;
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    });
    return apiClient;
}