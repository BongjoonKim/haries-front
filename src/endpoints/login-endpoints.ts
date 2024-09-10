import request, {securityReq} from "../services/request-response-service";
import {AxiosResponse} from "axios";
import {FuncProps} from "../utilities/endpointUtils";

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
  return (await request.post('/login/ps/refresh', {
    refreshToken : refreshToken
  })) as AxiosResponse<TokenDTO>
}

export async function getLoginUser(props : FuncProps) {
  try {
    return (await request.get(`/login/user`, {
      headers: {
        Authorization : `Bearer ${props?.accessToken}`
      }
    })) as AxiosResponse<UsersDTO>;
  } catch (e) {
    throw e;
  }
}

// 로그인을 했는지 안 했는지 알려줌
export async function isLogined() {
  return (await request.get('/login/ps/is/logined')) as AxiosResponse<TokenDTO>
}

export async function logout() {
  try {
    return (await request.get(`/login/logout`)) as AxiosResponse<any>;
  } catch (e) {
    throw e;
  }
}