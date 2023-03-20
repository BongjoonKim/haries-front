// 사용자 메인 메뉴 목록 요청
import request from "../services/request-response-service";
import {AxiosResponse} from "axios";
import {MenuType} from "../model/common/common-model";
import {CreateEditorProps} from "../components/widgets/Editor/Editor";

export async function retrieveMenus() {
    return (await request.get("/common/menu")) as AxiosResponse<MenuType[]>;
}

export async function getPropjectTreeStructureList(params: {searchPath:string}) {
    return (await request.put("/", params)) as AxiosResponse<any>;
}

export async function createDocuments(params: CreateEditorProps) {
    return (await request.put("/create-documents")) as AxiosResponse<any>;
}

export async function deleteFolder(folderObid: string) {
    return (await request.delete("/")) as AxiosResponse<any>;
}