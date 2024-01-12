import request from "../services/request-response-service";
import {AxiosResponse} from "axios";
import {FoldersDTO} from "../types/dto/FoldersDTO";

export async function getRootFolder() {
  return (await request.get("/admin/folders/root")) as AxiosResponse<FoldersDTO>;
}

export async function getChildFolders(params : {parentId : string}) {
  return (await request.get(`/admin/folders/children?parentId=${params.parentId}`)) as AxiosResponse<FoldersDTO[]>
}

export async function postFolders(params: FoldersDTO) {
  return (await request.post(`/admin/folders`, params)) as AxiosResponse<any>;
}

export async function putFolders(params: FoldersDTO) {
  return (await request.put(`/admin/folders`, params)) as AxiosResponse<any>;
}

export async function deleteFolder(id : string) {
  return (await request.delete(`/admin/folders?id=${id}`)) as AxiosResponse<any>;
}