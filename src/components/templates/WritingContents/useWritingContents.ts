import {useRef, MouseEvent, useCallback, MutableRefObject, useEffect} from "react";
import {Editor} from "@toast-ui/editor";
import {createDocuments} from "../../../endpoints/documents-endpoints";
import MessageBar from "../../widgets/MessageBar";

export type HookCallback = (url: string, text?: string) => void;
function useWritingContents() {
  const formData = new FormData();
  const editorRef = useRef<any>();
  const titleRef = useRef<any>();
  
  // 파일 첨부 추가
  const addFiles = (event : any): void => {
    event.preventDefault();
    const fileList = event.target.files;
    for(let key of Object.keys(fileList)) {
      if (key !== 'length') {
        formData.append("file", fileList[key])
      }
    }
  }
  
  // 글 저장 로직
  const handleSave = useCallback(async () => {
    const editorInfo = editorRef.current.getInstance();
    
    let contents = "";
    if (editorInfo.mode === "markdown") {
      contents = editorInfo.getMarkdown();
    } else if (editorInfo.mode === "wysiwig") {
      contents = editorInfo.getHTML();
    }
    
    const request : DocumentDTO = {
      titles: titleRef.current.value,
      contents : contents,
      contentsType : editorInfo.mode
    }
    
    try {
      console.log("저장 확인", request)
      await createDocuments(request);
    } catch (e) {
      console.log("save Error");
    }
    
  }, []);
  
  // 이미지 저장 로직
  const onUploadImage = async (blob: Blob, callback: HookCallback) => {
    // const url = await uploadImage(blob);
    // callback(url, 'alt text');
    console.log("블롭", blob);
    const objectURL = URL.createObjectURL(blob);
    console.log("블롭 -> url", objectURL);
    callback(objectURL);
  }
  
  return {
    addFiles,
    editorRef,
    titleRef,
    handleSave,
    onUploadImage
  }
}

export default  useWritingContents;