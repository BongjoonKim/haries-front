import styled from "styled-components";
import MainContent from "../MainContent/MainContent";
import "sendbird-uikit/dist/index.css";
import { App as SendbirdApp } from "sendbird-uikit";
import {Channel} from "sendbird-uikit";
import React, {useCallback, useEffect} from "react";
import axios from "axios";
import TextInput from "../../elements/TextInput";
import CustomButton from "../../elements/Button/CustomButton";
import ChatMessage from "./ChatMessage";
import ChannelBox from "./ChannelBox";
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import {Divider, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


function ChattingTemplate() {
  const gptBot = useCallback(async () => {
    axios.post("https://api-")
  }, []);
  
  useEffect(() => {
  
  }, []);
  return (
    <MainContent
      title="ChatGPT"
    >
      {/*<SendbirdApp appId={process.env["REACT_APP_SEND_BIRD_APP_ID"]!} userId={"User"} />*/}
      <StyledChattingTemplate>

        <div className="channel-view">
          <Paper
            component="form"
            sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', height : "2rem"}}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="search"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <div className="channel-list">
            <ChannelBox />
            <ChannelBox />
          </div>
          <div className="footer">
            <CustomButton
            >
              New Channel
            </CustomButton>
            <CustomButton
            >
              Delete
            </CustomButton>
          </div>
          
        </div>
        <div className="chat-view">
          <div className="message-history">
            <ChatMessage />
            <ChatMessage type={"me"}/>
            <ChatMessage type={"me"}/>
            <ChatMessage type={"me"}/>
            <ChatMessage type={"me"}/>
            <ChatMessage type={"me"}/>
            <ChatMessage type={"me"}/>
            <ChatMessage type={"me"}/>
            <ChatMessage type={"me"}/>
            <ChatMessage type={"me"}/>
            <ChatMessage type={"me"}/>
  
          </div>
          <div className="message-write">
            <TextInput />
            <CustomButton>
              전송
            </CustomButton>
          </div>
        </div>
       
      </StyledChattingTemplate>
      

    </MainContent>
  )
  
}

export default ChattingTemplate;

const StyledChattingTemplate = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  .channel-view {
    display: flex;
    flex-direction: column;
    width : 15rem;
    background-color: white;
    padding: 1rem 0.5rem;
    border-radius: 1rem 1rem;
    .channel-list {
      border: 1px solid gray;
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      height: 100%;
      overflow-y: auto;
      margin-bottom: 2rem;
    }
    .footer {
      display: flex;
      justify-content: space-between;
    }
  }
  .chat-view {
    flex-grow: 1;
    background-color: white;
    padding: 0.5rem 0.5rem;
    border-radius: 1rem 1rem;
    .message-history {
      padding-right: 0.5rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap : 1rem;
      height: 80vh;
      overflow-y: auto;
    }

    .message-write {
      display: flex;
      height: 5rem;
      align-items: center;
      width: 100%;
      .caIjNN { // textInput
        flex-grow: 1;
      }
    }
  }

`;