import styled from "styled-components";
import ChattingTemplate from "../../../components/templates/ChattingTemplate";
import {useEffect} from "react";

function ChattingPage() {
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <StyledChattingPage>
      <ChattingTemplate />
    </StyledChattingPage>
  )
}

export default ChattingPage;

const StyledChattingPage = styled.div`
  width: 100%;
  min-height: calc(var(--vh) * 100 - 5.25rem);

`;