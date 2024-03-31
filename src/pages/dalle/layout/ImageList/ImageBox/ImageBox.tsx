import styled from "styled-components";
import {DalleDTO} from "../../../../../types/dto/DalleDTO";

export default function ImageBox(props : DalleDTO) {
  console.log("이미지", props);
  return (
    <StyledImageBox>
    
    </StyledImageBox>
  )
}

const StyledImageBox = styled.div`
`;