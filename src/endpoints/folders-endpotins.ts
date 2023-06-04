import request from "../services/request-response-service";
import {AxiosResponse} from "axios";
import {FoldersDTO} from "../types/dto/foldersDTO";

export async function getRootFolder() {
  return (await request.get("/folders/root")) as AxiosResponse<FoldersDTO>;
}

export async function getChildFolders(params : {parentId : string}) {
  return (await request.get(`/folders/children?parentId=${params.parentId}`)) as AxiosResponse<FoldersDTO[]>
}