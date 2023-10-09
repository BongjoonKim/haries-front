import styled from "styled-components";
import {Avatar} from "@mui/material";

function ChannelBox() {
  return (
    <StyledChannelBox>
      <Avatar
      />
      <div className="info">
        <div className="title">
          김봉준 채녈
        </div>
        <div className="detail">
          설명입니다
        </div>
      </div>
    </StyledChannelBox>
  )
}

export default ChannelBox;

const StyledChannelBox = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
  padding: 0.5rem 0.5rem;
  border-bottom: 1px solid gray;
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
  &:active {
    background-color: #bec1c9;
  }
`;