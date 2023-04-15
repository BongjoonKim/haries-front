import {ChangeEvent, useCallback, useRef} from "react";
import {current} from "@reduxjs/toolkit";
import {createDocuments} from "../../../endpoints/documents-endpoints";

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
    const contents = editorRef.current.getInstance().getHTML();
    console.log("값", contents);
    console.log("제목", titleRef.current.value);
    
    const data: DocumentsDTO = {
      titles : titleRef.current.value,
      htmlContents : contents
    }
    console.log("데이터", data);
    try {
      await createDocuments(data);
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