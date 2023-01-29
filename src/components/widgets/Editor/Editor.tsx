import ReactQuill from "react-quill";
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
        ["bold", "italic", "underline", "strike", "blockquote"]
      ]
    }
  }), []);
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
          <th>상세내용</th>
          <td>
            <ReactQuill
              ref={(elements) => {
                if (elements !== null) {
                  props.quillRef.current = elements
                }
              }}
              value={props.htmlContent}
              onChange={props.setHtmlContent}
              theme="snow"
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