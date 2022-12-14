import axios, {AxiosRequestConfig} from "axios";

// interceptor
const request = axios.create({
    baseURL: "", // 기본 서버 주소 입력
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials' : false,
        "Content-Type": `application/json;charset=UTF-8`,
    },
});

export default request;