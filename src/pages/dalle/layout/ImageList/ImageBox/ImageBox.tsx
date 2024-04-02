import styled from "styled-components";
import {DalleDTO} from "../../../../../types/dto/DalleDTO";

export default function ImageBox(props : DalleDTO) {
  return (
    <StyledImageBox>
      <img src={props.url} />
    </StyledImageBox>
  )
}

const StyledImageBox = styled.div`
  min-width: 512px;
  min-height: 512px;
  img {
    width: 100%;
    height: 100%;
  }
`;