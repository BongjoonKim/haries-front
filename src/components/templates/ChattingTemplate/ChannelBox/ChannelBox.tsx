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
          설명입니다
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
    .title {
      font-weight: 600;
    }

    .detail {
      color: gray;
      font-size: 12px;
    }
  }

  &:hover {
    background-color: #bec1c9;
  }
`;