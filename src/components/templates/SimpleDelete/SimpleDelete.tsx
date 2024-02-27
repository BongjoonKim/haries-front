import styled from "styled-components";
import CustomButton from "../../elements/Button";
import {Form} from "react-router-dom";
import {FormControl} from "@mui/material";

function SimpleDelete(props : any) {
  return (
    <StyledSimpleDelete>
      <div className="title">
        <span>Really wanna Delete? </span>
      </div>
      <form
        onSubmit={(event : any) => {
          event.preventDefault();
          console.log("엔터", event.target.value)
        }
        }
      >
        <div className="footer">
            <input />
            <CustomButton
              onClick={props.onDelete}
              type="submit"
            >
              Delete
            </CustomButton>
            <CustomButton
              onClick={props.onCancel}
            >
              Cancel
            </CustomButton>
        </div>
      </form>
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