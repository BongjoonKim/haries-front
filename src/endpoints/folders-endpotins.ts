import request from "../services/request-response-service";
import {AxiosResponse} from "axios";
import {FoldersDTO} from "../types/dto/FoldersDTO";
import {FuncProps} from "../utilities/useAxios";

export async function getRootFolder() {
  return (await request.get("/admin/folders/ps/root")) as AxiosResponse<FoldersDTO>;
}

export async function getChildFolders(params : {parentId : string}) {
  return (await request.get(`/admin/folders/ps/children?parentId=${params.parentId}`)) as AxiosResponse<FoldersDTO[]>
}

export async function postFolders(props: FuncProps) {
  return (await request.post(
    `/admin/folders`, {...props.reqBody}
  , {
      headers: {
        Authorization: `Bearer ${props.accessToken}`
      }
    })) as AxiosResponse<any>;
}

export async function putFolders(props: FuncProps) {
  return (await request.put(`/admin/folders`, {...props.reqBody},{
    headers: {
      Authorization: `Bearer ${props.accessToken}`
    }
  })) as AxiosResponse<any>;
}

export async function deleteFolder(id : string) {
  return (await request.delete(`/admin/folders?id=${id}`)) as AxiosResponse<any>;
}