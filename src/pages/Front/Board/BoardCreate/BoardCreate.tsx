import ReactQuill from "react-quill";
import {MouseEventHandler, useEffect, useRef, useState} from "react";
import 'react-quill/dist/quill.snow.css';
// import Editor from "../../../../components/widgets/Editor";
import MarkDown from "../../../../components/widgets/MarkDown";
import Editor from "../../../../components/widgets/Editor";
import MainContent from "../../../../components/templates/MainContent/MainContent";
import Button from "../../../../components/elements/Button";
import Popper from "../../../../components/widgets/Popper";
import usePopup from "../../../../hooks/ui/usePopup";

function BoardCreate() {
  const quillRef = useRef<ReactQuill>(null);
  const [values, setValues] = useState<any>('');
  const [htmlContent, setHtmlConent] = useState<any>(null);
  
  useEffect(() => {
    console.log("변화",htmlContent)
  }, [htmlContent]);
  
  const {handleAddStatus} = usePopup();
  
  return (
    <MainContent>
      <Editor />
    </MainContent>
    
    
    
  )
}

export default BoardCreate;