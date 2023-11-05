import axios, {AxiosRequestConfig} from "axios";

// interceptor
const request = axios.create({
    baseURL: "", // 기본 서버 주소 입력
    headers: {
        'Access-Control-Allow-Origin': 'http://13.125.108.196:3001',
        'Access-Control-Allow-Credentials' : true,
        "Content-Type": `application/json;charset=UTF-8`,
    },
});

export default request;