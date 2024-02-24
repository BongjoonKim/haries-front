import styled, {css} from "styled-components";
import {Avatar, CircularProgress} from "@mui/material";
import moment from "moment";
import React from "react";
import MarkDown from "../../../widgets/MarkDown";


function ChatMessage(props : any) {
  return (
    <StyledMessageWrapper type={props.type}>
      {props.type === "loading" ? (
        <div className="message-box">
          <CircularProgress className="loading"/>
        </div>
      ) : (
        <div className="message-box">
          <MarkDown contents={props.content} />
        </div>
      )}

      <div className="info">
        <div className="avatar-wrapper">
          <Avatar
            alt="Remy Sharp"
            sx={{width: 32, height: 32}}
          />
        </div>
        <div className="time">
          {moment(props.created).format("HH:mm")}
        </div>
      </div>
    </StyledMessageWrapper>

    
  )
}

export default ChatMessage;

const StyledMessageWrapper = styled.div<{type : any}>`
  display: flex;
  height: fit-content;
  ${props => props.type === "me"
          ? css`
      margin-left: auto;
            flex-direction: row-reverse;
    ` : css`
      margin-right: auto;
    `
  }
  .message-box {
    max-width: 35rem;
    word-break: break-all;
    background-color : ${props => props.type === "me" ? "honeydew" : "beige"};
    border-radius: 1rem 1rem;
    box-shadow: 1px 1px 1px gray;
    padding: 1rem 1rem;
    position: relative;
    height: fit-content;
    .loading {
      margin: auto !important;
    }
    pre {
      word-break: break-word;
      white-space: pre-wrap;
    }
  }


  
  span {
    &:first-child {
      margin-top: auto;
      margin-bottom: auto;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    margin: 0.2rem 0.8rem;
    .avatar-wrapper {
      flex-grow: 1;
      .css-azeo8y-MuiAvatar-root {
        box-shadow: 1px 1px 1px gray;
      }
    }
    .time {
      color : gray;
      align-self: flex-end;
      font-size: 0.6rem;
    }
  }

`;

const StyledChatMessage = styled.div<{type : any}>`

`;