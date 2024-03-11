import styled from "styled-components";
import CustomButton from "../../elements/Button";
import TextInput from "../../elements/TextInput";
import {useEffect} from "react";

function SimpleSave(props : any) {
  
  useEffect(() => {
    function handleKeyPress(event:any) {
      if (event.key === 'Enter') {
        // 버튼 클릭 로직을 여기에 작성
        props.onOk();
      }
    }
    document.getElementsByClassName("MuiBox-root")[0]?.addEventListener('keypress', handleKeyPress);
    return () => {
      document.getElementsByClassName("MuiBox-root")[0]?.removeEventListener('keypress', handleKeyPress);
    };
  }, []);
  
  return (
    <StyledSimpleCreate>
      <div className="title">
        {props.title}
      </div>
      <div>
        <input
          value={props.contents}
          onChange={props.onChange}
          onKeyUp={(event : any) => {
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
  input {
    width: 100%;
  }
`;