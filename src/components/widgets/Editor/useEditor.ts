import {ChangeEvent, useCallback} from "react";
import {current} from "@reduxjs/toolkit";

function useEditor(editorRef : any, titleRef : any) {
  const formData = new FormData();
  
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
  
  return {
    addFiles,
  }
}

export default useEditor;