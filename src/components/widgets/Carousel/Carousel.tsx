import styled from "styled-components";
import useCarousel from "./useCarousel";
import ImageBox from "../../../pages/dalle/layout/ImageList/ImageBox";

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
    newList
  } = useCarousel({data : props.data});
  return (
    <StyledCarousel
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
    >
      <button onClick={() => handleMove(1)}>
        +1
      </button>
      <button onClick={() => handleMove(-1)}>
        -1
      </button>
      <div className='image-list' ref={ref}>
        {newList.map((el : any) => {
          return (
            <ImageBox url={el.url} />
          )
        })}
      </div>
    
    </StyledCarousel>
  )
}

const StyledCarousel = styled.div<any>`
  .image-list {
    display: flex;
  }
`;