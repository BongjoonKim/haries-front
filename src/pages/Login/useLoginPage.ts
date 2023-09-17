import {useCallback} from "react";

function useLoginPage() {
  const naverLogin = useCallback(async () => {
    const clientId = `${process.env.REACT_APP_NAVER_CLIENT_ID}`;
    const redirectUri = `${process.env.REACT_APP_REDIRECT_LOGIN_URI}`;
    console.log("clientId", clientId);
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  }, []);
  
  return {
    naverLogin
  }
}

export default useLoginPage;