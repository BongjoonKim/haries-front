import {SearchRounded} from "@material-ui/icons";
import {MailOutlineRounded} from "@material-ui/icons";
import {VpnKeyRounded} from "@material-ui/icons";
import styled from "styled-components";

function RightNavigator() {
  return (
    <StyledRightHeader>
      <SearchRounded />
      <MailOutlineRounded />
      <a>Contact Developer</a>
      <span> | </span>
      <VpnKeyRounded />
      <a>Login</a>
    </StyledRightHeader>
  )
}

export default RightNavigator;

const StyledRightHeader = styled.div`
  font-size: 26px;
  font-weight: 600;
  font-family: sans-serif;
  letter-spacing: -0.05rem;
  display: flex;
  align-items: center;
  padding-right: 50px;
  flex-direction: ;
`;