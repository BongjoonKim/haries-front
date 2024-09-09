import request from "../services/request-response-service";
import {AxiosResponse} from "axios";
import {DocumentDTO, DocumentsInfo, PaginationDTO} from "../types/dto/documentsInfo.d";
import {FuncProps} from "../utilities/endpointUtils";


// export async function createDocuments(writing?: DocumentDTO) {
//   return (await request.post("/documents/create", writing)) as AxiosResponse<any>;
// }

export async function createDocuments(props : FuncProps) {
  return (await request.post("/documents/create", props.reqBody, {
    headers:
      {
        Authorization: `Bearer ${props.accessToken}`
      }
  })) as AxiosResponse<DocumentDTO>;
}

// 모든 글 목록 조회
export async function getAllDocuments(params: PaginationDTO) {
  return (await request.get(`/documents/ps/get-all?page=${params.page}&size=${params.size}&folderId=${params.folderId}`)) as AxiosResponse<DocumentsInfo>;
}

// 글 조회
export async function getDocument(params: {id : string}) {
  return (await request.get(`/documents/ps/get?id=${params.id}`)) as AxiosResponse<DocumentDTO>;
}

export async function getDocumentUnique(params: {unique : string}) {
  return (await request.get(`/documents/get/key?unique=${params.unique}`)) as AxiosResponse<DocumentDTO>;
}

// 글 삭제
export async function deleteDocument(params: {id: string}) {
  return (await request.delete(`/documents/delete?id=${params.id}`)) as AxiosResponse<any>;
}

// 글 수정
// export async function saveDocument(params: {id ?: string, request : DocumentDTO}) {
//   console.log("저장", params)
//   return (await request.put(`/documents/save?id=${params.id}`, params.re)) as AxiosResponse<any>;
// }

export async function saveDocument(props : FuncProps) {
  return (await request.put(`/documents/save?id=${props.params.id}`, props.reqBody, {
      headers:
        {
          Authorization: `Bearer ${props.accessToken}`
        }
    }
  )) as AxiosResponse<any>;
}

// 폴더 글 조회
export async function getFolderDocuments(params: {folderId : string}) {
  return (await request.get(`/documents/ps/filter?folderId=${params.folderId}`)) as AxiosResponse<DocumentDTO[]>;
}