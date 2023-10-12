import styled from "styled-components";
import CustomButton from "../../elements/Button";

function SimpleDelete(props : any) {
  return (
    <StyledSimpleDelete>
      <div className="title">
        <span>Really wanna Delete? </span>
      </div>
      <div className="footer">
        <CustomButton
          onClick={props.onDelete}
        >
          Delete
        </CustomButton>
        <CustomButton
          onClick={props.onCancel}
        >
          Cancel
        </CustomButton>
      </div>
    </StyledSimpleDelete>
  )
}

export default SimpleDelete;

const StyledSimpleDelete = styled.div`
  display: flex;
  flex-direction: column;
  .footer {
    display: flex;
    justify-content: end;
  }
`;