import styled from "styled-components";
import {ImageBoxProps} from "../ImageBox";

interface ImageDetailProps {

}

function ImageDetail(props : ImageBoxProps) {
  return (
    <StyledImageDeatil>
      <div className="wrapper-top">
        <div className="image">
          <img
            src={props.url}
          />
        </div>
      </div>
        
      <div className="wrapper-bottom">
        <div className="wrapper-question">
          <div className="title">
            {props.question}
          </div>
      </div>
        {props.description}
      </div>
    </StyledImageDeatil>
  )
}

export default ImageDetail;

const StyledImageDeatil = styled.div`
  //width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: inherit;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .wrapper-top {
    display: flex;
    gap: 1rem;
    .image {
      width: 100%;
      height: 100%;
      img {
        border-radius: 16px 16px;
        width: inherit;
        height: inherit;
      }
    }
  }
  
  .wrapper-bottom {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 16px 16px;
    padding: 1rem;
    .wrapper-question {
      
      .title {
        font-size: 24px;
        font-weight: 600;
      }
    }
  }
`;