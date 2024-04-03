import styled from "styled-components";
import useCarousel from "./useCarousel";

export interface CarouselProps {
  data : any[];
}
export default function Carousel(props : CarouselProps) {
  const {} = useCarousel({data : props.data});
  return (
    <StyledCarousel>
    
    </StyledCarousel>
  )
}

const StyledCarousel = styled.div`
`;