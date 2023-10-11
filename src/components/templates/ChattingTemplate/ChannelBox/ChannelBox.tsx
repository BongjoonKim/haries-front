import styled from "styled-components";
import {Avatar} from "@mui/material";

function ChannelBox(props : any) {
  return (
    <StyledChannelBox
      onClick={props.onClick}
      active={props.selectedChannel === props.id ? "active" : ""}
    >
      <Avatar
      />
      <div className="info">
        <input type="hidden" value={props.id} />
        <div className="title">
          {props.title}
        </div>
        <div className="detail">
          {props.lastestMessage}
        </div>
      </div>
    </StyledChannelBox>
  )
}

export default ChannelBox;

const StyledChannelBox = styled.div<{active : string}>`
  display: flex;
  height: 3.5rem;
  align-items: center;
  padding: 0.5rem 0.5rem;
  border-bottom: 1px solid gray;
  background-color: ${props => props.active ? "#bec1c9" : ""};

  .info {
    margin-left: 1rem;
    width: 100%;

    .title {
      font-weight: 600;
    }

    .detail {
      color: gray;
      font-size: 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: break-word;
      width: 10rem;
      overflow-x: hidden;
    }
  }

  &:hover {
    background-color: ${props => props.active ? "" : "#edeff8"};
  }
`;