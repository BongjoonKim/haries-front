import styled from "styled-components";
import TextInput from "../../elements/TextInput";
import CustomButton from "../../elements/Button";

interface EditNamePopoverProps {
  folderName ?: string;
  onChange ?: any;
  onOk ?: any;
}

function EditNamePopover(props:EditNamePopoverProps) {
  return (
    <StyledEditNamePopover>
      <input
        value={props.folderName}
        onChange={props.onChange}
        onKeyDown={(event : any) => {
          if (event.key === "Enter") {
            props.onOk();
          }
        }}
      />
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