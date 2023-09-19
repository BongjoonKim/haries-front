import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {CircularProgress} from "@mui/material";


function RedirectLogin() {
  const navigate = useNavigate();
  const params = useParams();
  
  useEffect(() => {
    console.log("코드 확인", params)
  }, []);
  
  return (
    <CircularProgress />
  )
  
}

export default RedirectLogin;