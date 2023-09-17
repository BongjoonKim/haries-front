import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

function RedirectLogin() {
  const navigate = useNavigate();
  const {code} = useParams();
  useEffect(() => {
    console.log("코드 확인", code)
  }, []);
  
  return (
    <>
      <span>로딩 중</span>
    </>
  )
  
}

export default RedirectLogin;