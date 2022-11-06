import axios, {AxiosRequestConfig} from "axios";

// interceptor
const request = axios.create({
    baseURL: "http://localhost:3000", // 기본 서버 주소 입력
});

export default request;