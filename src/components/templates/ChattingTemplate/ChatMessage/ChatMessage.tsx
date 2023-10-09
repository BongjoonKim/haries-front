import styled, {css} from "styled-components";
import {Avatar} from "@mui/material";

function ChatMessage(props : any) {
  return (
    <StyledMessageWrapper type={props.type}>
      <div className="message-box">
        sdlfjs;ljfwoiefwqogien;;ogineosdnwgv;osindgvoianegongebonrebioalunsgbvli
        sdfs
        df
        sdf
        sdf
        sdf
        sdf
      </div>
      <div className="info">
        <div className="avatar-wrapper">
          <Avatar
            alt="Remy Sharp"
            sx={{width: 32, height: 32}}
          />
        </div>
        <div className="time">
          09:50
        </div>
      </div>
    </StyledMessageWrapper>

    
  )
}

export default ChatMessage;

const StyledMessageWrapper = styled.div<{type : any}>`
  display: flex;
  height: 100%;
  ${props => props.type === "me"
          ? css`
      margin-left: auto;
            flex-direction: row-reverse;
    ` : css`
      margin-right: auto;
    `
  }
  .message-box {
    max-width: 20rem;
    word-break: break-all;
    background-color : ${props => props.type === "me" ? "honeydew" : "beige"};
    border-radius: 1rem 1rem;
    box-shadow: 1px 1px 1px gray;
    padding: 1rem 1rem;
    position: relative;
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