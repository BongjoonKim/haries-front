import {MutableRefObject, useMemo, useRef} from "react";
import useEditor from "./useEditor";
import styled from "styled-components";
import Button from "../../elements/Button/Button";
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
  const onUploadImage = async (blob: any, callback: any) => {
    console.log("blob", blob);
    console.log("callback", callback);
  };
  
  // 커스텀 하기
  return (
    <StyledEditor>
      <table className="editor-table">
        <tbody>
          <tr>
            <td colSpan={2}>
              <th>
                <textarea id="editor-table-title" placeholder="제목을 입력하세요" />
              </th>
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
          <tr>
            <th>첨부파일</th>
            <td>
              <input type="file" id="fileUpload" onChange={addFiles} />
            </td>
          </tr>
        </tbody>
      </table>
      <StyledEditorBottom>
        <Button >
          임시저장
        </Button>
        <Button >
          발행
        </Button>
      </StyledEditorBottom>

    </StyledEditor>
    
  )
}

export default Editor;

const StyledEditor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .editor-table {
    textarea {
      border: none;
      width: 80rem;
    }

    .react-quill-area {
      width: 100%;
    }

    .ql-container {
      min-height: 40rem;

    }
  }
`;

const StyledEditorBottom = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: center !important;
  align-items: center;
`;