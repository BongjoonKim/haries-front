import Navbar from "../components/headMenu/Navbar";
import MainPage from "../components/contents/MainPage/MainPage";
import styled from "styled-components";


function IntroPage() {
    return (
      <StyleIntroPage>
        <img src={`${process.env.PUBLIC_URL}/fontana.jpeg`} width={"100%"}
        />
      </StyleIntroPage>
    );
}

export default IntroPage;

const StyleIntroPage = styled.div`
  z-index: 9998;
`;