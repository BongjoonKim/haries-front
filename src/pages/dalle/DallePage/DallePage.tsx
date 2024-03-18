import styled from "styled-components";
import {useInView} from "react-intersection-observer";


function DallePage() {
  // Infinite Board 개발 예정
  const [ref, inView] = useInView();
  
  return (
    <StyledDallePage>
    
    </StyledDallePage>
  )
}

export default DallePage;

const StyledDallePage = styled.div`
  `;