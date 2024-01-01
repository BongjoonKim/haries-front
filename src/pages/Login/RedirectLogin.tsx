import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {CircularProgress} from "@mui/material";
import {doLogin, oAuth2Login} from "../../endpoints/login-endpoints";
import {useRecoilState} from "recoil";
import recoilCommonState from "../../stores/recoil/recoilCommonState";


function RedirectLogin() {
  const [isLogin, setLogin] = useRecoilState(recoilCommonState.isLogin);
  const navigate = useNavigate();
  
  const getUserInfo = useCallback(async (code : string, state : string) => {
    try {
      const response = await doLogin({code : code, state : state});
      console.log("response 값 확인", response);
      localStorage.setItem("authorization", response.headers.authorization);
      localStorage.setItem("refreshtoken", response.headers.refreshtoken);
      setLogin(true);
    } catch (error) {
      console.log("getUserInfo error : ", error);
    }

  }, [isLogin]);
  
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