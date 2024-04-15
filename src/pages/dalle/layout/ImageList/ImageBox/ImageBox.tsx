import styled, {css} from "styled-components";
import {DalleDTO} from "../../../../../types/dto/DalleDTO";

interface ImageBoxProps extends DalleDTO {
  index ?: number;
  curInx ?: number;
  width ?: number;
  height ?: number;
  
}

export default function ImageBox(props : ImageBoxProps) {
  return (
    <StyledImageBox
      imageInx={props.index}
      curInx={props.curInx}
      width={props.width}
      height={props.height}
    >
      <img src={props.url} />
    </StyledImageBox>
  )
}

const StyledImageBox = styled.div<any>`
  min-width: ${(props : any) => (`${props.width}px` || "512px")};
  min-height: ${(props : any) => (`${props.height}px` || "512px")};
  margin: 0 16px;
  //max-width: 512px;
  //max-height: 512px;
  ${props => {
    if (props.imageInx === props.curInx + 1) {
      return css`
        //position: relative;
        //min-width: 600px;
        //min-height: 600px;
        //animation: 2s ease-in-out infinite alternate;
        //border: 1px solid black;
      `;
    } else {
      return css`
    
    `;
    }

  }}
  img {
    width: 100%;
    height: 100%;
    border-radius: 8px 8px;

  }
`;