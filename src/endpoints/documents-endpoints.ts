import request from "../services/request-response-service";
import {AxiosResponse} from "axios";


export async function createDocuments(params: DocumentDTO) {
  return (await request.post("/documents/create", params)) as AxiosResponse<any>;
}

// 모든 글 목록 조회
export async function getAllDocuments(params: PaginationDTO) {
  return (await request.get(`/documents/get-all?page=${params.page}&size=${params.size}`)) as AxiosResponse<DocumentsInfo>;
}

export async function getDocuments(params: {id : string}) {
  return (await request.get(`/documents/get?id=${params.id}`)) as AxiosResponse<DocumentDTO>;
}