import ReactQuill from "react-quill";
import {MutableRefObject, useMemo} from "react";

export interface EditorProps{
  quillRef : MutableRefObject<any>;
  htmlContent : any;
  setHtmlContent: any;
}



function Editor(props: EditorProps) {
  // 커스텀 하기
  const modules = useMemo<any>(() => ({
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"]
      ]
    }
  }), []);
  return (
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
  )
}

export default Editor;