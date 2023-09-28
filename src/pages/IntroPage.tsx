import MainPage from "../components/contents/MainPage/MainPage";
import styled from "styled-components";
import {useTransition} from "react-spring";
import {NavigatorItemProps} from "../containers/global/Header/Navigator/list/types";


function IntroPage() {
    return (
      <StyleIntroPage >
        <img
          className="intro-image"
          src={`${process.env.PUBLIC_URL}/Cityscapes.jpeg`}
          width={"100%"}
        />
      </StyleIntroPage>
    );
}

export default IntroPage;

const StyleIntroPage = styled.div`
  z-index: 9998;
  overflow: hidden;
  img {
    transition: all 5s linear;
  }
  &:hover img {
    transform: scale(1.1);
  }
`;