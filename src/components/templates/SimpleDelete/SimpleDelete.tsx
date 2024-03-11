import styled from "styled-components";
import CustomButton from "../../elements/Button";
import {Form} from "react-router-dom";
import {FormControl} from "@mui/material";
import {useEffect} from "react";

function SimpleDelete(props : any) {
  
  useEffect(() => {
    function handleKeyPress(event:any) {
      if (event.key === 'Enter') {
        // 버튼 클릭 로직을 여기에 작성
        props.onDelete();
      }
    }
    document.getElementsByClassName("MuiBox-root")[0]?.addEventListener('keypress', handleKeyPress);
    return () => {
      document.getElementsByClassName("MuiBox-root")[0]?.removeEventListener('keypress', handleKeyPress);
    };
  }, []);
  
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
            <CustomButton
              onClick={props.onDelete}
              type="submit"
              onSubmit={(event : any) => {
                event.preventDefault();
                console.log("엔터", event.target.value)
              }}
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