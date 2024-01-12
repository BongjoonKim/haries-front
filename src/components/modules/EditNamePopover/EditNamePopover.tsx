import styled from "styled-components";
import TextInput from "../../elements/TextInput";
import CustomButton from "../../elements/Button";
import {useState} from "react";

interface EditNamePopoverProps {
  type ?: "add" | "edit" | "delete";
  folderName ?: string;
  onChange ?: any;
  onOk ?: any;
  onDelete ?: any;
  onCancel ?: any;
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
        {props.type === "add" ? (
          <CustomButton
            onClick={props.onOk}
          >
            create
          </CustomButton>
          ) : props.type === "edit" ? (
          <CustomButton
            onClick={props.onOk}
          >
            save
          </CustomButton>
        ) : (
          <CustomButton
            onClick={props.onDelete}
          >
            delete
          </CustomButton>
        )}
        <CustomButton onClick={props.onCancel}>
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