import {ChangeEvent} from "react";

function useEditor() {
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
    addFiles
  }
}

export default useEditor;