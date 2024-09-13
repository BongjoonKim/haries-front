import axios, {AxiosRequestConfig} from "axios";

// interceptor
const request = axios.create({
    baseURL: "", // 기본 서버 주소 입력
    headers: {
        // 'Access-Control-Allow-Origin': 'http://13.209.27.28:3001',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKEND_URI}`,
        'Access-Control-Allow-Credentials' : true,
        "Content-Type": `application/json;charset=UTF-8`,
    },
});

// 로그인 전용 axios
export const securityReq = axios.create({
    baseURL:"/",
    headers: {
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKEND_URI}`,
        'Access-Control-Allow-Credentials' : true,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

export default request;