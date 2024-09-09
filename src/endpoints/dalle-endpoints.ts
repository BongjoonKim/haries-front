import request from "../services/request-response-service";
import {AxiosResponse} from "axios";

export async function askDalle(props : {
  channelId ?: string;
  question ?: string;
}) {
  return (await request.post("/dalle/image", props)) as AxiosResponse<any>;
}

export async function getDalleImages() {
  return (await request.get("/dalle/images")) as AxiosResponse<any>;
}

export async function getDalle(id : string) {
  return (await request.get(`/dalle/image?id=${id}`)) as AxiosResponse<any>
}

export async function deleteDalle(id : string) {
  return (await request.delete(`/dalle/image?id=${id}`)) as AxiosResponse<any>
}