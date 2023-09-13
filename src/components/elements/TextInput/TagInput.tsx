import {
  ChangeEvent,
  Dispatch,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  MouseEventHandler,
  SetStateAction, useCallback,
  useRef,
  useState
} from "react";
import {TextField} from "@mui/material";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import {useRecoilState} from "recoil";
import {DocumentDTO} from "../../../types/dto/documentsInfo";
import recoilDocumentsState from "../../../stores/recoil/recoilDocumentsState";

export interface TagInputProps extends InputHTMLAttributes<HTMLInputElement> {
  tags ?: string[];
  setTags ?: Dispatch<SetStateAction<string[]>>;
  onKeyDown ?: any;
  // 한글일 때는 onKeyDown이 잘 작동하지 않기 때문이다.
  onKeyUp ?: any;
  onDelete ?: (event : MouseEventHandler<HTMLElement>) => void;
  value : any;
  onChange ?: any;
  filter?: RegExp;
}



function TagInput(props : TagInputProps, ref : ForwardedRef<HTMLInputElement>) {
  const [value, setValue] = useState<string | number | readonly string[] | undefined>(props.value || "");
  const [writing, setWriting] = useRecoilState<DocumentDTO>(recoilDocumentsState.writingInfo);
  
  const [tags, setTags] = useState<any>(props.tags);
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    if (props.filter) {
      event.target.value = String(event.target.value)?.replace?.(props.filter, "");
    }
    props.onChange?.(event);
    setValue(() => event.target.value)
  }, [value]);
  
  // 태그 입력 함수
  const addTag = useCallback( (event : any) => {
    if (event.code === "Enter") {
      if (value !== "" && !tags.includes(value)) {
        setTags((prev : string[]) => [...prev, value]);
        setValue("");
      }
    }
  }, [tags, value]);
  
  // 태그 삭제 함수
  const tagDelete = useCallback((event : any) => {
    const deleteTag = event.currentTarget.parentElement.parentElement.children[0].innerHTML.slice(1);
    setTags((prev : string[]) => {
      return prev.filter(el => el !== deleteTag);
    })
  }, [tags]);
  
  const Tag = (tags ?: string[]) => {
    console.log("태그 정보 확인", tags)
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
                  onClick={tagDelete}
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
      {Tag(tags)}
      <div className="tag-input">
        <span>#</span>
        <input
          value={!value ? props.value : value}
          onKeyDown={props.onKeyDown}
          // onKeyUp={props.onKeyUp}
          onKeyUp={addTag}
          onChange={handleChange}
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