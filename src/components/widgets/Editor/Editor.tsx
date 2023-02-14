import {MutableRefObject, useEffect, useMemo, useRef} from "react";
import useEditor from "./useEditor";
import styled from "styled-components";
import Button from "../../elements/Button";
import { Editor as ToastUi } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export interface EditorProps{
  titles?: string;
  quillRef?: MutableRefObject<any>;
  htmlContent?: any;
  setHtmlContent?: any;
  
  attachmentFiles?: any;
}

export type HookCallback = (url: string, text?: string) => void;

export type HookMap = {
  addImageBlobHook?: (blob: Blob | File, callback: HookCallback) => void;
};

function Editor(props: EditorProps) {
  const {addFiles} = useEditor();
  
  // Ref 설정
  const editorRef = useRef<any>();
  
  // 변경될 떄마다 가져옴
  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    console.log(data);
  };
  
  // 이미지 업로드 처리
  const onUploadImage = async (blob: Blob, callback: HookCallback) => {
    // const url = await uploadImage(blob);
    // callback(url, 'alt text');
    console.log("블롭", blob);
    const objectURL = URL.createObjectURL(blob);
    console.log("블롭 -> url", objectURL);
    callback(objectURL);
    
  };
  // 커스텀 하기
  return (
    <StyledEditor>
      <table className="editor-table">
        <tbody>
          <tr>
            <td colSpan={2}>
                <textarea id="editor-table-title" placeholder="제목을 입력하세요" />
            </td>
          </tr>
          <tr>
            <td className="react-quill-area" colSpan={2}>
              <ToastUi
                initialValue=" "
                initialEditType="wysiwyg"
                plugins={[colorSyntax]}
                ref={editorRef}
                language="ko-KR"
                onChange={onChange}
                height="600px"
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
          <Button variant="contained" color="primary" children="임시저장" />
          <Button variant="contained" color="secondary" children="발행" />
        </StyledRightEditorButton>
      </StyledEditorButton>
    </StyledEditor>
    
  )
}

export default Editor;

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