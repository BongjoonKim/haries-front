import request from "../services/request-response-service";
import {AxiosResponse} from "axios";
import {MessageHistoryDTO} from "../types/dto/messageHistoryDTO";
import {FuncProps} from "../utilities/useAxios";

export async function createChannel(props : FuncProps) {
  return (await request.post("/chatting/channel", {channelName : props?.params?.channelName}, {
    headers : {
      Authorization : `Bearer ${props.accessToken}`
    }
  })) as AxiosResponse<any>;
}

export async function getChannels(props : FuncProps) {
  return (await request.get(`/chatting/channels?channelName=${props?.params?.channelName || ""}`, {
    headers : {
      Authorization : `Bearer ${props.accessToken}`
    }
  })) as AxiosResponse<any>;
}

export async function deleteChannel(props : FuncProps) {
 return (await request.delete(`/chatting/channel?channelId=${props?.params?.channelId}`, {
   headers : {
     Authorization : `Bearer ${props.accessToken}`
   }
 })) as AxiosResponse<any>;
}

export async function createUserMessage(props : FuncProps) {
  return (await request.post(`/chatting/user/message`, props.reqBody, {
    headers : {
      Authorization : `Bearer ${props.accessToken}`
    }
  })) as AxiosResponse<any>;
}
export async function createMessage(props : FuncProps) {
  return (await request.post(`/chatting/message`, props?.reqBody, {
    headers : {
      Authorization : `Bearer ${props.accessToken}`
    }
  })) as AxiosResponse<any>;
}

export async function getMessages(props:FuncProps) {
  return (await request.get(`/chatting/messages?channelId=${props?.params?.channelId}&page=${props?.params?.page}&size=10`, {
    headers : {
      Authorization : `Bearer ${props.accessToken}`
    }
  })) as AxiosResponse<any>;
}
