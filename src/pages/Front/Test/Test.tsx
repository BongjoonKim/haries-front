import usePopup from "../../../hooks/ui/usePopup";
import Button from "../../../components/elements/Button";
import Test2 from "./Test2";
import React, {useCallback} from "react";
import MainContent from "../../../components/templates/MainContent/MainContent";
import windowUtil from "../../../utilities/window.util";
function Test() {
  const {handleAddStatus, getPopupProps} = usePopup();
  
  
  const handleClick = useCallback(() => {
    const data = windowUtil("http://localhost:2999/frontEnd/test/independent");
    
  }, []);
  
  
  
  
  return (
    <MainContent id="11">
      <p>여기</p>
      <Button onClick={handleClick}>
        클릭
      </Button>
      {/*<Dialog id="11" status={{"id" : "11", status : "Popup"}}>*/}
      {/*  <Test2 />*/}
      {/*</Dialog>*/}
    </MainContent>
  )
}

export default Test;