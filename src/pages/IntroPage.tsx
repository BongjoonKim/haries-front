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
        </div>
        <div
          className="middle"
        >
        
        </div>
        {/*<img*/}
        {/*  className="intro-image"*/}
        {/*  src={`${process.env.PUBLIC_URL}/Cityscapes.jpeg`}*/}
        {/*  width={"100%"}*/}
        {/*/>*/}
        
        
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
    height: 100%;
  }

  &:hover img {
    transform: scale(1.1);
  }

  .top {

  }
  .middle {
    background: #eee1d6;
    width: 100%;
    height: 40%;
  }
`;