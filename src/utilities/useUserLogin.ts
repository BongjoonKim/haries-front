
import {useRecoilState, useSetRecoilState} from "recoil";
import recoilCommonState from "../stores/recoil/recoilCommonState";
import {getLoginUser} from "../endpoints/login-endpoints";
import {useAuth} from "../appConfig/authContext";
import useAxios, {axiosUtils} from "./useAxios";

export default function useUserLogin() {
  const {accessToken, setAccessToken} = useAuth();
  const setLoginUserData = useSetRecoilState(recoilCommonState.loginUserData);
  
  // 로그인한 사용자 정보 가져오기
  const getLoginedUser = async () => {
    try {
      const resUser = await axiosUtils.authAxios({
        func : getLoginUser,
        accessToken : accessToken,
        setAccessToken : setAccessToken
      });
      if (resUser.status === 200) {
        setLoginUserData(resUser.data);
      } else {
        throw resUser.statusText;
      }
    } catch (e) {
      console.log("getLoginedUser", e)
    }

  }
  
  return {
    getLoginedUser
  }
}