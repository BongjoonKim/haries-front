import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {CircularProgress} from "@mui/material";
import {doLogin} from "../../endpoints/login-endpoints";


function RedirectLogin() {
  const navigate = useNavigate();
  
  const getUserInfo = useCallback(async (code : string, state : string) => {
    const response = await doLogin({code : code, state : state})
    console.log("response 값 확인", response)
  }, []);
  
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    console.log()
    getUserInfo(code!, state!);
    
    navigate("/home");
  }, []);
  
  return (
    <CircularProgress />
  )
  
}

export default RedirectLogin;