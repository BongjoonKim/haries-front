import ReactQuill, {Quill} from "react-quill";
import Parchment from 'parchment';
import {MutableRefObject, useMemo} from "react";
import useEditor from "./useEditor";
import styled from "styled-components";
import Button from "../../elements/Button/Button";

export interface EditorProps{
  titles: string;
  quillRef : MutableRefObject<any>;
  htmlContent : any;
  setHtmlContent: any;
  
  attachmentFiles?: any;
}



function Editor(props: EditorProps) {
  const {addFiles} = useEditor();
  
  // 커스텀 하기
  const modules = useMemo<any>(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],["bold", "italic", "underline", "strike", "blockquote"],
          ["link", "image", "video"]
      ]
    }
  }), []);
  
  
  
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "video",
    "width",
  ];
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
              <ReactQuill
                ref={(elements) => {
                  if (elements !== null) {
                    props.quillRef.current = elements
                  }
                }}
                value={props.htmlContent}
                onChange={props.setHtmlContent}
                modules={modules}
                theme="snow"
                formats={formats}
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