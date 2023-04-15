import {useCallback, MouseEvent} from "react";
import {useNavigate} from "react-router-dom";

function useSubContext() {
  const navigate = useNavigate();
  
  const contentsOnClick = useCallback( ( event : MouseEvent<HTMLElement>) => {
    navigate(`${event.currentTarget.id}`)
    
  }, []);
  
  return {
    contentsOnClick
  }
}

export default useSubContext;