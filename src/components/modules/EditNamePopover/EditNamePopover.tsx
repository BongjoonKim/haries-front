import styled from "styled-components";
import TextInput from "../../elements/TextInput";
import CustomButton from "../../elements/Button";

function EditNamePopover() {
  return (
    <StyledEditNamePopover>
      <TextInput />
      <div className="footer">
        <CustomButton>
          save
        </CustomButton>
        <CustomButton>
          cancel
        </CustomButton>
      </div>
    </StyledEditNamePopover>
  )
}

export default EditNamePopover;

const StyledEditNamePopover = styled.div`
  width : fit-content;
  height : 100%;
  padding: 1rem 1rem;
  .footer {
    display: flex;
  }
`;