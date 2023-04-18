import useWritingContents from "./useWritingContents";
import {Editor as ToastUi} from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Button from "../../elements/Button";
import styled from "styled-components";
import Editor from "../../widgets/Editor";


function WritingContents() {
  const {addFiles, editorRef, titleRef, handleSave, onUploadImage} = useWritingContents();
  
  return (
    <StyledEditor>
      <table className="editor-table">
        <tbody>
        <tr>
          <td colSpan={2}>
            <textarea id="editor-table-title" ref={titleRef} placeholder="제목을 입력하세요" />
          </td>
        </tr>
        <tr>
          <td className="react-toast-area" colSpan={2}>
            <Editor
              editorRef={editorRef}
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
          <Button variant="contained" color="primary" children="임시저장" onClick={handleSave} />
          <Button variant="contained" color="secondary" children="발행" />
        </StyledRightEditorButton>
      </StyledEditorButton>
    </StyledEditor>
  )
}

export default WritingContents;

const StyledEditor = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  .editor-table {
    margin: auto;
    width: 100%;
    textarea {
      width: 100%;
      border: none;
      display: flex;
    }
    .editor-table-info {
      width: 100%;
    }
  }
`;

const StyledEditorButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledRightEditorButton = styled.div`
  display: flex;
  bottom: 0;
  margin-left: auto;
  align-items: center;
`;
const StyledLeftEditorButton = styled.div`
  display: flex;
  bottom: 0;
  //justify-content: left !important;
  margin-right: auto;
  align-items: center;
`;