import {useCallback, useEffect, useState} from "react";
import {retrieveMenus} from "../../../endpoints/common-endpoints";
import {useNavigate, useLocation} from "react-router-dom";

function useExampleOne() {
  const navigate = useNavigate();
  const location = useLocation();
  const threeOnClick = () => {
    console.log("location", location);
    navigate(`${location.pathname}/example-three`);
  }
  
  return {
    threeOnClick
  }
  
  
}

export default useExampleOne;