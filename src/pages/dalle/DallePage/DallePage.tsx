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
      <div className='footer-content'>
      
      </div>
    </StyledDallePage>
  )
}

export default DallePage;

const StyledDallePage = styled.div`
  width: 100%;
  padding : 4rem 4rem;
  display: flex;
  flex-direction: column;
  .header-content {
  
  }
  .body-content {
    flex-grow: 1;
    align-content: center;
  }
  
  .footer-content {
    height : 20%
  }
`;