import request from "../services/request-response-service";
import {AxiosResponse} from "axios";

export async function doLogin(params : {code : string, state : string}) {
  return (await request.get(`/login/naver?code=${params.code}&state=${params.state}`)) as AxiosResponse<any>
}