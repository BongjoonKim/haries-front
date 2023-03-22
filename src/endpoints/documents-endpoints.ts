import {CreateEditorProps} from "../components/widgets/Editor/Editor";
import request from "../services/request-response-service";
import {AxiosResponse} from "axios";

export async function createDocuments(params: DocumentsDTO) {
  return (await request.post("documents/create", params)) as AxiosResponse<any>;
}