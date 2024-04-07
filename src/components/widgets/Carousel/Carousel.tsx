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
    curInx
  } = useCarousel({data : props.data});
  return (
    <StyledCarousel
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
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
            />
          )
        })}
      </div>
    
    </StyledCarousel>
  )
}

const StyledCarousel = styled.div<any>`
  overflow: hidden;
  width: 832px;
  .left {
    position: relative;
    top : 50%;
    z-index: 9000;
  }
  .right {
    position: relative;
    //left: calc(100% - document;
    right : calc(-100% + 5rem);
    top : 50%;
    z-index: 9000;
  }
  .image-list {
    display: flex;
    gap: 16px;
  }
`;