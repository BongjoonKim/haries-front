import {useCallback} from "react";
import {doLogin, oAuth2Login} from "../../endpoints/login-endpoints";
import request from "../../services/request-response-service";

function useLoginPage() {
  const naverLogin = useCallback( async () => {
    const clientId = `${process.env.REACT_APP_NAVER_CLIENT_ID}`;
    const redirectUri = `${process.env.REACT_APP_REDIRECT_LOGIN_URI}`;
    console.log("clientId", clientId);
    const response = await oAuth2Login();
    // console.log("결과값 확인", response)
    // window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=false`;
  }, []);
  
  return {
    naverLogin
  }
}

export default useLoginPage;