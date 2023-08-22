import {ChangeEvent, useCallback, useRef} from "react";
import {current} from "@reduxjs/toolkit";
import {createDocuments} from "../../../endpoints/documents-endpoints";
import {DocumentDTO} from "../../../types/dto/documentsInfo";

function useEditor() {
  const formData = new FormData();
  const editorRef = useRef<any>();
  const titleRef = useRef<any>();
  
  const addFiles = (event : any): void => {
    event.preventDefault();
    const fileList = event.target.files;
    for(let key of Object.keys(fileList)) {
      if (key !== 'length') {
        formData.append("file", fileList[key])
      }
      
    }
    console.log("file확인", fileList);
  }
  
  const handleSave = useCallback(async () => {
    console.log("마크다운 값 확인", editorRef.current.getInstance());
    const contents = editorRef.current.getInstance().getHTML();
    
    const data: DocumentDTO = {
      title : titleRef.current.value,
      contents : contents
    }
    try {
      // await createDocuments(data);
    } catch (e) {
      console.log(e, "save 실패");
    }
    
  }, []);
  
  // 변경될 떄마다 가져옴
  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    console.log(data);
  };
  
  return {
    addFiles,
    editorRef,
    titleRef,
    handleSave,
    onChange
  }
}

export default useEditor;