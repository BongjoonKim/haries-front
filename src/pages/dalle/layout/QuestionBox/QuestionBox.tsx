import styled from "styled-components";
import TextInput from "../../../../components/elements/TextInput";

export default function QuestionBox(props : any) {
  return (
    <StyledQuestionBox>
      <TextInput
        width={"20rem"}
        height={"100rem"}
      />
    </StyledQuestionBox>
  )
}

const StyledQuestionBox = styled.div`
`;