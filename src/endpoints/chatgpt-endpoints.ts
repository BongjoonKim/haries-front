import request from "../services/request-response-service";
import {AxiosResponse} from "axios/index";
import {FuncProps} from "../utilities/useAxios";

// export async function askChatGPT(props : {
//   channelId ?: string
//   question : string
// }) {
//   return (await request.post("/chatgpt/open-ai", {question : props.question, channelId : props.channelId})) as AxiosResponse<any>;
// }

export async function askChatGPT(props : FuncProps) {
  return (await request.post("/chatgpt/open-ai", props.reqBody, {
    headers : {
      Authorization : `Bearer ${props.accessToken}`
    }
  })) as AxiosResponse<any>;
}