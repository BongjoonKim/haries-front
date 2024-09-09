import request, {securityReq} from "../services/request-response-service";
import {AxiosResponse} from "axios";

export async function doLogin(params : {code : string, state : string}) {
  return (await request.get(`/login/naver?code=${params.code}&state=${params.state}`)) as AxiosResponse<any>
}

export async function oAuth2Login() {
  return (await request.post(`/oauth2/authorization/naver`)) as AxiosResponse<any>
}

export async function login(props: UsersDTO) {
  try {
    return (await securityReq.post("/ps/login",  {
      username : props.userId,
      password : props.userPassword
    })) as AxiosResponse<TokenDTO>
  } catch (e) {
    throw e;
  }
}

// accessToken이 만료되었을 때 작업
export async function udtRefreshToken(refreshToken : string) {
  console.log("udtRefreshToken", refreshToken)
  return (await request.post('/ps/login/refresh', {
    refreshToken : refreshToken
  })) as AxiosResponse<TokenDTO>
}

export async function getLoginUser(accessToken : any) {
  try {
    return (await request.get(`ps/login/user`, {
      headers: {
        Authorization : `Bearer ${accessToken}`
      }
    })) as AxiosResponse<UsersDTO>;
  } catch (e) {
    throw e;
  }
}

export async function logout() {
  try {
    return (await request.get(`ps/login/logout`)) as AxiosResponse<any>;
  } catch (e) {
    throw e;
  }
}