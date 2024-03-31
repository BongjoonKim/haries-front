import styled from "styled-components";
import {useInView} from "react-intersection-observer";
import QuestionBox from "../layout/QuestionBox";
import ImageList from "../layout/ImageList";


function DallePage() {
  // Infinite Board 개발 예정
  const [ref, inView] = useInView();
  
  return (
    <StyledDallePage>
      <div className="header-content">
        <QuestionBox/>
      </div>
      <div className="body-content">
        <ImageList />
      </div>
    </StyledDallePage>
  )
}

export default DallePage;

const StyledDallePage = styled.div`
  width: 100%;
  padding : 4rem 4rem;
  .header-content {
  
  }
`;