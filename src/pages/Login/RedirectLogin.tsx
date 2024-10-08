import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {CircularProgress} from "@mui/material";
import {doLogin, oAuth2Login} from "../../endpoints/login-endpoints";
import {useRecoilState, useRecoilValue} from "recoil";
import recoilCommonState from "../../stores/recoil/recoilCommonState";


function RedirectLogin() {
  const userAuth = useRecoilValue(recoilCommonState.loginUserData);
  const navigate = useNavigate();
  
  const getUserInfo = useCallback(async (code : string, state : string) => {
    try {
      
      
      
      
      const response = await doLogin({code : code, state : state});
      sessionStorage.setItem("authorization", response.headers.authorization);
      sessionStorage.setItem("refreshtoken", response.headers.refreshtoken);
      
      
    } catch (error) {
      console.log("getUserInfo error : ", error);
    }

  }, [userAuth]);
  
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    getUserInfo(code!, state!);
    
    navigate("/home");
  }, []);
  
  return (
    <CircularProgress />
  )
  
}

export default RedirectLogin;