import styled from "styled-components";
import TextInput from "../../../../components/elements/TextInput";

export default function QuestionBox(props : any) {
  return (
    <StyledQuestionBox>
      <TextInput
        height={"3rem"}
        placeholder = {"Describe what you want"}
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