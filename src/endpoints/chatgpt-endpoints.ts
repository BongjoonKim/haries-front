import request from "../services/request-response-service";
import {AxiosResponse} from "axios/index";

export async function askChatGPT(props : {question : string}) {
  return (await request.post("/chatgpt/open-ai", {question : props.question})) as AxiosResponse<any>;
}