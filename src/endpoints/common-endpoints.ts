// 사용자 메인 메뉴 목록 요청
import request from "../services/request-response-service";
import {AxiosResponse} from "axios";

export async function retrieveMainMenu() {
    return (await request.get("/menu-item")) as AxiosResponse<any>;
}