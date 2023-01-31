import ReactQuill, {Quill} from "react-quill";
import Parchment from 'parchment';
import {MutableRefObject, useMemo} from "react";
import useEditor from "./useEditor";

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
    <table className="editor-table">
      <tbody>
        <tr>
          <th>제목</th>
          <td>
            <span>제목 적을 곳</span>
          </td>
        </tr>
        <tr>
          <td width="1000px" colSpan={2}>
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
  )
}

export default Editor;