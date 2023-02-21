import styled from "styled-components";
import Wrapper from "../../components/elements/Layout/Column";
import TextInput from "../../components/elements/TextInput";
import MainContent from "../../components/templates/MainContent/MainContent";
import {IconButton} from "@material-ui/core";
import CustomButton from "../../components/elements/Button/CustomButton";

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
            <CustomButton>로그인</CustomButton>
          </IconButton>
        </StyleButtons>
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