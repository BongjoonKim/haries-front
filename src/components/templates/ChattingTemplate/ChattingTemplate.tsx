import styled from "styled-components";
import MainContent from "../MainContent/MainContent";
import "sendbird-uikit/dist/index.css";
import { App as SendbirdApp } from "sendbird-uikit";
import {Channel} from "sendbird-uikit";
import {useCallback, useEffect} from "react";
import axios from "axios";


function ChattingTemplate() {
  const gptBot = useCallback(async () => {
    axios.post("https://api-")
  }, []);
  
  useEffect(() => {
  
  }, []);
  return (
    <MainContent
      title="ChatGPT"
      // footer={
      //   <div>안녕</div>
      // }
    >
      {/*<SendbirdApp appId={process.env["REACT_APP_SEND_BIRD_APP_ID"]!} userId={"User"} />*/}
      

    </MainContent>
  )
  
}

export default ChattingTemplate;

const StyledChattingTemplate = styled.div`
  `;