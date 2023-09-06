import {
  Dispatch,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState
} from "react";
import {TextField} from "@mui/material";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';

export interface TagInputProps extends InputHTMLAttributes<HTMLInputElement> {
  tags ?: string[];
  setTags ?: Dispatch<SetStateAction<string[]>>;
  onKeyDown ?: any;
  // 한글일 때는 onKeyDown이 잘 작동하지 않기 때문이다.
  onKeyUp ?: any;
  onDelete : (event : MouseEventHandler<HTMLElement>) => void;
  value : any;
  onChange : any;
}



function TagInput(props : TagInputProps, ref : ForwardedRef<HTMLInputElement>) {
  
  const Tag = (tags ?: string[]) => {
    return (
      <span
        style={{
          display : "flex",
          // gridAutoColumns : "auto"
        }}
      >
        {!!tags ? tags.map((tag : string, inx: number) => {
          return (
            <span
              key={inx}
              style={{
                display: "flex",
                alignItems : "center",
                lineHeight: "1rem",
                width: "max-content" // max-content로 해줘야 한글도 일자로 나오게 된다
              }}
            >
              <span>#{tag}</span>
              <span>
                <CloseIcon
                  onClick={(event : any) => props.onDelete(event)}
                />
              </span>
            </span>
          )})
         : (
           <></>
          )
        }
      </span>
    )
  }
  
  return (
    <StyledTag>
      {Tag(props.tags)}
      <div className="tag-input">
        <span>#</span>
        <input
          value={props.value}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyUp}
          onChange={props.onChange}
        />
      </div>
    </StyledTag>
  )
}

export default forwardRef(TagInput);

const StyledTag = styled.span`
  width: 100px;
  display: flex;
  input {
    border: none;
    background: none;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  .tag-input {
    display: flex;
    span {
      line-height: 3rem;
    }
  }
`