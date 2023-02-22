import styled from "styled-components";
import Wrapper from "../../components/elements/Layout/Column";
import TextInput from "../../components/elements/TextInput";
import MainContent from "../../components/templates/MainContent/MainContent";
import {IconButton} from "@material-ui/core";
import CustomButton from "../../components/elements/Button/CustomButton";
import Button from "../../components/elements/Button";

function LoginPage() {
  return (
    <MainContent>
      <Wrapper>
        <StyleTitle>
          <p>Haries</p>
        </StyleTitle>
        <StyleInputs>
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" placeholder="Password" />
        </StyleInputs>
        <StyleButtons>
          <IconButton>
            <Button>로그인</Button>
          </IconButton>
        </StyleButtons>
        <p className="change-password">비밀번호 재설정</p>
        <p className="change-password">회원가입</p>
        <StyleSimpleLogin>
          <span>SNS계정으로 간편 로그인/회원가입</span>
          <IconButton>
            <Button className="kakaoTalk">
              {/*<link rel="icon" href="%PUBLIC_URL%/kakao.jpeg" />*/}
              <img src={`${process.env.PUBLIC_URL}/kakao.jpeg`}/>
            </Button>
          </IconButton>
          <Button className="naver">
            <img src={`${process.env.PUBLIC_URL}/naver.jpeg`}/>
          </Button>
          
        </StyleSimpleLogin>
      </Wrapper>
      
    </MainContent>


  );
}

export default LoginPage;

const StyleTitle = styled.div`
  align-items: center;
  margin: auto;
`;

const StyleInputs = styled.div`
`;

const StyleButtons = styled.div`
`;

const StyleSimpleLogin = styled.div`
`;