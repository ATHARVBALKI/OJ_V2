import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData,credentials,withCredentials, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        credentials:`${credentials}`,
        withCredentials : `${withCredentials}`,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}