import styled from "styled-components";
import useCarousel from "./useCarousel";
import ImageBox from "../../../pages/dalle/layout/ImageList/ImageBox";
import CustomButton from "../../elements/Button";
import CustomIconButton from "../../elements/Button/CustomIconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {IconButton} from "@mui/material";

export interface CarouselProps {
  data : any[];
  retrieve ?: () => void;
}
export default function Carousel(props : CarouselProps) {
  console.log("props 확인", props)
  const {
    handleMove,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    ref,
    newList,
    curInx,
    carouselWidth,
    imgWidth,
    imgHeight
  } = useCarousel({data : props.data});
  return (
    <StyledCarousel
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
      imgHeight={imgHeight}
      carouselWidth={carouselWidth}
    >
      <IconButton
        className={"left"}
        onClick={() => handleMove(-1)}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        className={"right"}
        onClick={() => handleMove(1)}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <div className='image-list' ref={ref}>
        {newList.map((el : any, inx : number) => {
          return (
            <ImageBox
              key={inx}
              index={inx}
              curInx={curInx}
              url={el.url}
              width={imgWidth}
              height={imgHeight}
              retrieve={props.retrieve}
              {...el}
            />
          )
        })}
      </div>
    
    </StyledCarousel>
  )
}

const StyledCarousel = styled.div<{
  carouselWidth : number;
  imgHeight : number;
}>`
  overflow: hidden;
  width: ${(props : any) => `${props.carouselWidth}px`};
  display: flex;
  align-content: center;
  height: ${(props : any) => `${props.imgHeight}px`};
  button {
    border-radius: inherit !important;
  }
  
  .left {
    position: relative;
    //top : 50%;
    z-index: 9000;
  }
  .right {
    position: relative;
    //left: calc(100% - document;
    right : calc(-100% + 5rem);
    //top : 50%;
    z-index: 9000;
  }
  .image-list {
    display: flex;
    //overflow-x: hidden;
    //width: 832px;
    //gap: 16px;
  }
`;