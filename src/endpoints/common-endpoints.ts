// 사용자 메인 메뉴 목록 요청
import request from "../services/request-response-service";
import {AxiosResponse} from "axios";

export async function retrieveMainMenu() {
    return (await request.get("/test")) as AxiosResponse<any>;
}

export async function getPropjectTreeStructureList(params: {searchPath:string}) {
    return (await request.put("/", params)) as AxiosResponse<any>;
}

export async function deleteFolder(folderObid: string) {
    return (await request.delete("/")) as AxiosResponse<any>;
}