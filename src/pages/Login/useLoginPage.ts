import {useCallback, useState} from "react";
import {doLogin, getLoginUser, login, oAuth2Login} from "../../endpoints/login-endpoints";
import request from "../../services/request-response-service";
import {setCookie} from "../../utilities/cookieUtils";
import {useLocation, useNavigate} from "react-router-dom";
import useMode from "../../hooks/ui/useMode";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import recoilCommonState from "../../stores/recoil/recoilCommonState";
import {useAuth} from "../../appConfig/authContext";
import {axiosUtils} from "../../utilities/useAxios";

function useLoginPage() {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const {getModeProps : getLocalModeProps, handleShowMode, handleCloseMode, handleCloseAllMode} = useMode();
  const userAuth = useRecoilValue(recoilCommonState.loginUserData);
  const {accessToken, setAccessToken} = useAuth();
  const [errInfo, setErrInfo] = useRecoilState(recoilCommonState.errInfo);
  const [loginUser, setLoginUserData] = useRecoilState(recoilCommonState.loginUserData);
  const resetErrInfo = useResetRecoilState(recoilCommonState.errInfo);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
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
        
        const resUserInfo = await axiosUtils.authAxios({
          func:getLoginUser,
          accessToken: accessToken,
          setAccessToken: setAccessToken
        });
        
        if (resUserInfo.status === 200) {
          setLoginUserData(
            {...resUserInfo.data},
          );
        } else {
          throw resUserInfo.statusText;
        }
        handleCloseMode({name : "login-modal"})
      }
    } catch (e) {
      setErrInfo({
        isOpen : true,
        statusText : e?.toString()
      });
      // setTimeout(() => {
      //   resetErrInfo();
      // }, 2000)
    }
  
  }
  
  return {
    naverLogin,
    userId,
    setUserId,
    userPassword,
    setUserPassword,
    loginUser,
    handleClick,
    errInfo,
    showPassword,
    setShowPassword,
  }
}

export default useLoginPage;