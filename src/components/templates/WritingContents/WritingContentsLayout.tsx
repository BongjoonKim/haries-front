import {StyledEditor, StyledEditorButton, StyledLeftEditorButton, StyledRightEditorButton} from "./WritingStyle";
import React, {MutableRefObject, ReactNode, Suspense, useState} from "react";
import Button from "../../elements/Button";
import Editor from "../../widgets/Editor";
import TextInput from "../../elements/TextInput";
import useWritingContents from "./useWritingContents";

interface WritingContentsLayoutProps {
  titleRef : MutableRefObject<HTMLTextAreaElement>
  children : ReactNode;
  addFiles : any;
  handleSave : () => void;
  titles ?: string | number | readonly string[] | undefined;
  
}

function WritingContentsLayout(props : WritingContentsLayoutProps) {
  const {handleOutPage} = useWritingContents();
  
  return (
    <StyledEditor>
      <table className="editor-table">
        <tbody>
        <tr>
          <td colSpan={2}>
            <TextInput
              name="title"
              id="editor-table-title"
              ref={props.titleRef}
              placeholder="제목을 입력하세요"
              defaultValue={props.titles}
            />
          </td>
        </tr>
        <tr>
          <td className="react-toast-area" colSpan={2}>
            {props.children}
          </td>
        </tr>
        <tr className="editor-table-info">
          <th>첨부파일</th>
          <td>
            <input type="file" id="fileUpload" onChange={props.addFiles} />
          </td>
        </tr>
        </tbody>
      </table>
      <StyledEditorButton>
        <StyledLeftEditorButton>
          <Button variant="contained" color="secondary" children="나가기" onClick={handleOutPage}/>
        </StyledLeftEditorButton>
        <StyledRightEditorButton>
          <Button variant="contained" color="primary" children="미리보기" />
          <Button variant="contained" color="primary" children="임시저장"  />
          <Button variant="contained" color="secondary" children="발행" onClick={props.handleSave}/>
        </StyledRightEditorButton>
      </StyledEditorButton>
    </StyledEditor>
  )
}

export default WritingContentsLayout;