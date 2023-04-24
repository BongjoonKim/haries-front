import {useRef, MouseEvent, useCallback, MutableRefObject, useEffect, useState} from "react";
import {Editor} from "@toast-ui/editor";
import {createDocuments, getDocuments, saveDocument} from "../../../endpoints/documents-endpoints";
import MessageBar from "../../widgets/MessageBar";
import {useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import recoilDocumentsState from "../../../stores/recoil/recoilDocumentsState";
import recoilCommonState from "../../../stores/recoil/recoilCommonState";
import {DocumentDTO} from "../../../types/dto/documentsInfo";

export type HookCallback = (url: string, text?: string) => void;
function useWritingContents() {
  const formData = new FormData();
  const editorRef = useRef<any>();
  const titleRef = useRef<any>();
  const [writing, setWriting] = useRecoilState<DocumentDTO>(recoilDocumentsState.writingInfo);
  const [message, setMessage]  = useRecoilState<{isOpen : boolean, contents : string}>(recoilCommonState.messageOpener);
  // 수정 화면일 경우
  const {id} = useParams();
  
  // 수정 화면일 경우 조회 로직
  const getDocumentData = useCallback(async (id : string) => {
    try {
      const response = await getDocuments({id : id!});
      setWriting(response.data);
      console.log("글", response.data);
      if (response.data.contentsType === "markdown") {
        editorRef.current.setMarkdown(response.data.contents)
      } else if (response.data?.contentsType === "wysiwyg") {
        editorRef.current.setHTML(response.data.contents);
      } else {
        editorRef.current.setMarkdown(response.data.contents)
      }
      
    } catch (error) {
      setMessage(prev => {
        let data = JSON.parse(JSON.stringify(prev));
        return {
          contents : "글 데이터 가져오기 실패",
          isOpen: true
        }
      });
    }
  }, []);
  
  
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
    } else if (editorInfo.mode === "wysiwyg") {
      contents = editorInfo.getHTML();
    }
    
    const request : DocumentDTO = {
      titles: titleRef.current.value,
      contents : contents,
      contentsType : editorInfo.mode
    }
    try {
      if (!!id) {
        await saveDocument({id, request});
      } else {
        console.log("저장 확인", request)
        await createDocuments(request);
      }

    } catch (e) {
      setMessage(prev => {
        return {
          contents : "글 저장 실패",
          isOpen : true
        }
      })
    }
    
  }, [message]);
  
  // 이미지 저장 로직
  const onUploadImage = async (blob: Blob, callback: HookCallback) => {
    // const url = await uploadImage(blob);
    // callback(url, 'alt text');
    console.log("블롭", blob);
    const objectURL = URL.createObjectURL(blob);
    console.log("블롭 -> url", objectURL);
    callback(objectURL);
  }
  
  useEffect(() => {
    if (!!id) {
      getDocumentData(id);
    }
  }, []);
  
  return {
    addFiles,
    editorRef,
    titleRef,
    handleSave,
    onUploadImage,
    writing
  }
}

export default  useWritingContents;