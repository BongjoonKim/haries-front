import styled from "styled-components";
import Wrapper from "../../components/elements/Layout/Column";
import TextInput from "../../components/elements/TextInput";
import MainContent from "../../components/templates/MainContent/MainContent";
import {IconButton} from "@material-ui/core";
import CustomButton from "../../components/elements/Button/BasicButton";
import Button from "../../components/elements/Button";
import useLoginPage from "./useLoginPage";
import {ChangeEvent, MouseEventHandler} from "react";
import {Alert, FormControl, Input, InputAdornment, InputLabel, Snackbar, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@material-ui/icons";

function LoginPage() {
  const {
    naverLogin,
    userId,
    setUserId,
    userPassword,
    setUserPassword,
    loginUser,
    handleClick,
    errInfo,
    showPassword,
    setShowPassword,
  } = useLoginPage();
  return (
    <MainContent>

      <Wrapper>
        <StyleTitle>
          <p>⭐️ Haries ⭐</p>
        </StyleTitle>
        <StyleInputs>
          <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
            <TextField
              id="standard-multiline-static"
              label="ID"
              rows={1}
              value={userId}
              defaultValue="Default Value"
              variant="standard"
              onChange={(event : ChangeEvent<HTMLInputElement>) => {setUserId(event.target.value)}}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={userPassword}
                onChange={(event : ChangeEvent<HTMLInputElement>) => {setUserPassword(event.target.value)}}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(prev => !prev)}
                      // onMouseDown={(event : MouseEventHandler<HTMLButtonElement>) => {
                      // }}
                      // onMouseUp={(event : MouseEventHandler) => {
                      // }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
          </FormControl>
        </StyleInputs>
        {/*로그인 버튼*/}
        <Button
          className="login-button"
          variant="contained"
          children="로그인"
          fullWidth={true}
          color="primary"
          styles={{
            padding: "0.5rem 0 0.5rem 0",
          }}
          onClick={handleClick}
        />
        <StyleLinks>
          <a className="change-password">비밀번호 재설정</a>
          <a className="sign-up">회원가입</a>
        </StyleLinks>
        <p
          className="login-explain"
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            paddingTop: "5rem"
          }}
        >
          SNS계정으로 간편 로그인 / 회원가입
        </p>
        <StyleSimpleLogin>
          
          <Button className="kakaoTalk">
            <img src={`${process.env.PUBLIC_URL}/kakao_login_large.png`} width={"160rem"}/>
          </Button>
          <Button className="naver" onClick={naverLogin}>
            <img src={`${process.env.PUBLIC_URL}/naver_login.png`} width={"140rem"}/>
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
  width : 100%;
  display: flex;
  flex-direction: column;
`;

const StyleButtons = styled.div`
  display: flex;
  .login-button {
    margin: 1rem;
  }
`;

const StyleLinks = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  font-size: 1rem;
  padding-top: 1rem;
  .change-password {
    text-align: center;
    padding-right: 2rem;
  }
  
`;

const StyleSimpleLogin = styled.div`
  display: flex;
  .login-explain {
  }
  .kakaoTalk {
    width: auto;
  }
  .naver {
    width: auto;
  }
`;