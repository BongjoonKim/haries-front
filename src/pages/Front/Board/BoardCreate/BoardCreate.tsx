import ReactQuill from "react-quill";
import {useEffect, useRef, useState} from "react";
import 'react-quill/dist/quill.snow.css';
import Editor from "../../../../components/widgets/Editor";

function BoardCreate() {
  const quillRef = useRef<ReactQuill>(null);
  const [values, setValues] = useState<any>('');
  const [htmlContent, setHtmlConent] = useState<any>(null);
  
  useEffect(() => {
    console.log("변화",htmlContent)
  }, [htmlContent])
  
  return (
    <Editor
      titles="타이틀"
      quillRef={quillRef}
      htmlContent={htmlContent}
      setHtmlContent={setHtmlConent}
    />
  )
}

export default BoardCreate;