import useWritingContents from "../useWritingContents";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Button from "../../../elements/Button";
import styled from "styled-components";
import Editor from "../../../widgets/Editor";
import {StyledEditor, StyledEditorButton, StyledLeftEditorButton, StyledRightEditorButton} from "../WritingStyle";

function CreateContent() {
  
  const {addFiles, editorRef, titleRef, handleSave, onUploadImage, writing } = useWritingContents();
  
  return (
    <StyledEditor>
      <table className="editor-table">
        <tbody>
        <tr>
          <td colSpan={2}>
            <textarea id="editor-table-title" ref={titleRef} placeholder="제목을 입력하세요" value={writing.titles} onChange={(event) => (console.log(event))}/>
          </td>
        </tr>
        <tr>
          <td className="react-toast-area" colSpan={2}>
              <Editor
                editorRef={editorRef}
                initialEditType={writing.contentsType!}
                hooks={{
                  addImageBlobHook: onUploadImage
                }}
              />
          </td>
        </tr>
        <tr className="editor-table-info">
          <th>첨부파일</th>
          <td>
            <input type="file" id="fileUpload" onChange={addFiles} />
          </td>
        </tr>
        </tbody>
      </table>
      <StyledEditorButton>
        <StyledLeftEditorButton>
          <Button variant="contained" color="secondary" children="나가기" />
        </StyledLeftEditorButton>
        <StyledRightEditorButton>
          <Button variant="contained" color="primary" children="미리보기" />
          <Button variant="contained" color="primary" children="임시저장"  />
          <Button variant="contained" color="secondary" children="발행" onClick={handleSave}/>
        </StyledRightEditorButton>
      </StyledEditorButton>
    </StyledEditor>
  )
}

export default CreateContent;