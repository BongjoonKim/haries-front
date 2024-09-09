import {useCallback, useState} from "react";
import {doLogin, login, oAuth2Login} from "../../endpoints/login-endpoints";
import request from "../../services/request-response-service";
import {useAuth} from "../../appConfig/AuthContext";
import {setCookie} from "../../utilities/cookieUtils";
import {useLocation, useNavigate} from "react-router-dom";
import useMode from "../../hooks/ui/useMode";

function useLoginPage() {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const {setAccessToken} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {getModeProps : getLocalModeProps, handleShowMode, handleCloseMode, handleCloseAllMode} = useMode();
  
  
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
      handleCloseMode({name : "login-modal"})
      const resToken = await login({
        userId : userId,
        userPassword: userPassword
      });
      if (resToken.data) {
        setAccessToken(resToken.data.accessToken);
        setCookie("accessToken", resToken.data.accessToken!)
        setCookie("refreshToken", resToken.data.refreshToken!);
        navigate(location.pathname);
        console.log("여기 오나")
        // handleCloseMode({name : "login-modal"})
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