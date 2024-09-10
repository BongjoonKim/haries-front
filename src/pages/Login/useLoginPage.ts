import {useCallback, useState} from "react";
import {doLogin, getLoginUser, login, oAuth2Login} from "../../endpoints/login-endpoints";
import request from "../../services/request-response-service";
import {useAuth} from "../../appConfig/AuthContext";
import {setCookie} from "../../utilities/cookieUtils";
import {useLocation, useNavigate} from "react-router-dom";
import useMode from "../../hooks/ui/useMode";
import {useRecoilState} from "recoil";
import recoilCommonState from "../../stores/recoil/recoilCommonState";
import {endpointUtils} from "../../utilities/endpointUtils";

function useLoginPage() {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const {getModeProps : getLocalModeProps, handleShowMode, handleCloseMode, handleCloseAllMode} = useMode();
  const [userAuth, setUserAuth] = useRecoilState(recoilCommonState.userAuth);
  const {accessToken, setAccessToken} = useAuth();
  
  
  const naverLogin = useCallback( async () => {
    const clientId = `${process.env.REACT_APP_NAVER_CLIENT_ID}`;
    const redirectUri = `${process.env.REACT_APP_REDIRECT_LOGIN_URI}`;
    console.log("clientId", clientId);
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=false`;
  }, []);
  
  const handleClick = async () => {
    console.log("userId", userId)
    console.log("userPassword", userPassword);
    try {
      const resToken = await login({
        userId : userId,
        userPassword: userPassword
      });
      if (resToken.data) {
        setAccessToken(resToken.data.accessToken);
        setCookie("accessToken", resToken.data.accessToken!)
        setCookie("refreshToken", resToken.data.refreshToken!);
        navigate(location.pathname);
        console.log("여기 오나");
        
        const resUserInfo = await endpointUtils.authAxios({
          func:getLoginUser,
          accessToken: accessToken,
          setAccessToken: setAccessToken
        });
        
        console.log("resUserInfo", resUserInfo);
        if (resUserInfo.status === 200) {
          setUserAuth(
            {...resUserInfo.data},
            {...resToken.data}
          );
        } else {
          throw resUserInfo.statusText;
        }
        handleCloseMode({name : "login-modal"})
      }
    } catch (e) {
      console.log("login failed")
    }
  
  }
  
  return {
    naverLogin,
    userId,
    setUserId,
    userPassword,
    setUserPassword,
    handleClick,
  }
}

export default useLoginPage;