import MainPage from "../components/contents/MainPage/MainPage";
import styled from "styled-components";
import {useTransition} from "react-spring";
import {NavigatorItemProps} from "../containers/global/Header/Navigator/list/types";


function IntroPage() {
  return (
    <StyleIntroPage >
      <div
        className="top"
      >
        <div className="top">
          <div
            className="image-cover"
          >
            <img
              className="intro-image"
              src={`${process.env.PUBLIC_URL}/IMG_3040.JPG`}
              width={"100%"}
            />
          </div>
        </div>
      </div>
      <div
        className="middle"
      >
      
      </div>
    
    
    
    </StyleIntroPage>
  );
}

export default IntroPage;

const StyleIntroPage = styled.div`
  z-index: 9998;
  overflow: hidden;
  width: 100%;

  img {
    transition: all 5s linear;
    width: 300px;
    height: 500px;
    object-fit: cover;
    //height: 100%;
  }

  //&:hover img {
  //  transform: scale(1.1);
  //}

  .top {
    
    .image-cover {
      position: absolute;
      left: 50rem;
    }
  }
  .middle {
    background: #eee1d6;
    width: 100%;
    height: 40%;
  }
`;