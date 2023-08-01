import axios from "axios";

const serverInstance = axios.create({
    baseURL: "http://13.209.233.160:8080/v1",
});

serverInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error("API call error: ", error);
        return Promise.reject(error);
    }
);

export { serverInstance };
