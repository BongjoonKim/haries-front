import {CreateEditorProps} from "../components/widgets/Editor/Editor";
import request from "../services/request-response-service";
import {AxiosResponse} from "axios";


export async function createDocuments(params: Documents.DocumentsDTO) {
  return (await request.post("documents/create", params)) as AxiosResponse<any>;
}

export async function getAllDocuments(params: PaginationDTO) {
  return (await request.get(`documents/get-all?page=${params.page}&size=${params.size}`)) as AxiosResponse<Documents.DocumentsInfo>;
}