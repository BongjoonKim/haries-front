import styled from "styled-components";
import TextInput from "../../../../components/elements/TextInput";
import useQuestionBox from "./useQuestionBox";

export default function QuestionBox(props : any) {
  const {
    handleEnter
  } = useQuestionBox();
  return (
    <StyledQuestionBox>
      <TextInput
        height={"3rem"}
        placeholder = {"Describe what you want"}
        onKeyUp={handleEnter}
      />
    </StyledQuestionBox>
  )
}

const StyledQuestionBox = styled.div`
  width: 100%;
  input {
    font-size: 1.5rem !important;
    border: 2px solid snow !important;
    padding: 0rem 1rem !important;
  }
`;