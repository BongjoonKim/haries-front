
// 제목과 같은 값 입력할 수 있는 곳
import styled from "styled-components";
import {ForwardedRef, forwardRef, MutableRefObject, useCallback, useState} from "react";

function TitleInput(props : any, ref : ForwardedRef<HTMLInputElement>) {
  const [value, setValue] = useState(props.value);
  const handleChange = useCallback((event : any) => {
    setValue(event.target.value);
  }, [props.value, value])
  
  return (
    <StyledTitleInput>
      <input
        id={props.id}
        className={props.className}
        ref={ref}
        onChange={handleChange}
        value={value}
        placeholder={props.placeholder}
      />
    </StyledTitleInput>
  )
}

export default forwardRef(TitleInput);

const StyledTitleInput = styled.div`
  input {
    border: none;
    border-bottom: 1px solid #e0e0e0;
    background: none;
    width: 100%;
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 500;
    &:focus-visible {
      border: none;
      outline: none;
    }
  }
`;