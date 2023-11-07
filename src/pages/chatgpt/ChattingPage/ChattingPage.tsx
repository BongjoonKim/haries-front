import styled from "styled-components";
import ChattingTemplate from "../../../components/templates/ChattingTemplate";

function ChattingPage() {
  return (
    <StyledChattingPage>
      <ChattingTemplate />
    </StyledChattingPage>
  )
}

export default ChattingPage;

const StyledChattingPage = styled.div`
  width: 100%;
  //height: calc(var(--vh, 1vh) * 100);

`;