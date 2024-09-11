import {getCookie, setCookie} from "./cookieUtils";
import {udtRefreshToken} from "../endpoints/login-endpoints";
import {ACCESSTOKEN_NULL, REFESHTOKEN_EXPIRED} from "../constants/ErrorCode";
import {useRecoilState} from "recoil";
import recoilCommonState from "../stores/recoil/recoilCommonState";
import {useAuth} from "../appConfig/authContext";

interface AxiosProps  {
  func ?: any;
  accessToken ?: string;
  setAccessToken ?: any;
  params ?: any;
  reqBody ?: any;
}

export interface FuncProps {
  accessToken ?: string;
  func ?: any;
  params ?: any;
  reqBody ?: any;
}

export const axiosUtils = {
  async authAxios(props : AxiosProps) {
    console.log("props확인", props)
    try {
      if (props.accessToken) {
        return (await props.func({
          accessToken : props.accessToken,
          params : props?.params,
          reqBody : props?.reqBody
        }));
      } else {
        throw ACCESSTOKEN_NULL;
      }
    } catch (e) {
      const refreshToken = getCookie("refreshToken");
      // console.log("refreshToken", refreshToken)
      if (refreshToken && refreshToken !== "undefined") {
        const res = await udtRefreshToken(getCookie("refreshToken").replace(/^"(.*)"$/, '$1'));
        // console.log("리프레시 토큰", refreshToken, getCookie("refreshToken"), res, props)
        if (res.data) {
          setCookie("refreshToken", res.data.refreshToken!);
          props.setAccessToken(res.data.accessToken);
          return (await props.func({
            accessToken: res.data.accessToken,
            params : props?.params,
            reqBody : props?.reqBody
          }))
        } else {
          throw REFESHTOKEN_EXPIRED;
        }
      } else {
        throw REFESHTOKEN_EXPIRED;
      }
    }
  }
}

// authEndPoint의 약자
export default function useAxios() {
  const {accessToken, setAccessToken} = useAuth();
  const authEP = async (props : AxiosProps) => {
    try {
      return await axiosUtils.authAxios({
        ...props,
        accessToken : accessToken,
        setAccessToken : setAccessToken
      });
    } catch (e) {
      console.log("authEndpoint", e)
    }
  }
  
  return {
    authEP
  }
  
}