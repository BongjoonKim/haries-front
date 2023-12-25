import styled from "styled-components";
import CustomButton from "../../elements/Button";
import TextInput from "../../elements/TextInput";

function SimpleSave(props : any) {
  return (
    <StyledSimpleCreate>
      <div className="title">
        {props.title}
      </div>
      <div>
        <input
          value={props.contents}
          onChange={props.onChange}
          onKeyDown={(event : any) => {
            if (event.key === "Enter") {
              props.onOk();
            }
          }}
        />
      </div>
      <div className="footer">
        <CustomButton
          onClick={props.onOk}
        >
          Create
        </CustomButton>
        <CustomButton
          onClick={props.onCancel}
        >
          Cancel
        </CustomButton>
      </div>
    </StyledSimpleCreate>
  )
}

export default SimpleSave;

const StyledSimpleCreate = styled.div`
  .title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .footer {
    margin-top: 1rem;
    display: flex;
    justify-content: end;
  }
`;