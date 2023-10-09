import styled from "styled-components";
import CustomButton from "../../elements/Button";
import TextInput from "../../elements/TextInput";

function SimpleCreate(props : any) {
  return (
    <StyledSimpleCreate>
      <div className="title">
        {props.title}
      </div>
      <div>
        <TextInput
          value={props.contents}
          onChange={props.onChange}
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

export default SimpleCreate;

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