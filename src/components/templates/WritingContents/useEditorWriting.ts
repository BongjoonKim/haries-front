import {useCallback, useEffect, useRef, useState} from "react";
import {useRecoilState, useResetRecoilState} from "recoil";
import {DocumentDTO} from "../../../types/dto/documentsInfo";
import recoilDocumentsState from "../../../stores/recoil/recoilDocumentsState";
import {HookCallback} from "./useWritingContents";
import {useNavigate, useParams} from "react-router-dom";
import {createDocuments, getDocument, getDocumentUnique, saveDocument} from "../../../endpoints/documents-endpoints";
import generatorUtil from "../../../utilities/generatorUtil";
import recoilDocumentState from "../../../stores/recoil/recoilDocumentsState";
import {startsWith} from "lodash";
import awsS3 from "../../../appConfig/file/awsS3";
import {s3Utils} from "../../../utilities/s3Utils";

function useEditorWriting() {
  const editorRef = useRef<any>();
  // 글 정보를 담고있을 로직
  const [writing, setWriting] = useRecoilState<DocumentDTO>(recoilDocumentsState.writingInfo);
  const resetWriting = useResetRecoilState(recoilDocumentsState.writingInfo);
  const titleRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const {id} = useParams();
  const formData = new FormData();
  const navigate = useNavigate();
  const [uploadedList, setUploadedList] = useRecoilState(recoilDocumentState.uploadedList);
  
  console.log("아이디 확인", id)
  
  // 수정 화면일 때 조회 로직
  const getDocumentData = useCallback(async (id ?: string) => {
    try {
      console.log("getDocumentData 오나")
      if (id) {
        const response = await getDocument({id : id!});
        setWriting({
          ...response.data
        });
      } else {
        console.log("리셋하러 오나")
        resetWriting();
      }
    } catch (e) {
      console.log("getDocumentData", e);
    }
  }, [writing, resetWriting]);
  
  
  // 파일 저장
  const onUploadImage = async (blob: Blob, callback: HookCallback) => {
    try {
      const fileName = generatorUtil.uuid();
      let fileKey = ``;
      if (id) {
        fileKey = `${id}/${fileName}`;
      } else {
        fileKey = `new/${fileName}`;
      }
      
      const file = new File([blob], `${fileName}`, {type:blob.type});
      const response = await s3Utils.uploadFile({fileKey : fileKey, file : file})
      
      setUploadedList((prev : any) => [
        ...prev,
        {
          blob: blob,
          key: `${fileKey}`
        }
      ])
      await callback(response);
    } catch (e) {
      callback("fail image upload");
      console.log("에러 확인", e)
    }
  };
  
  // 파일 첨부 로직
  const addFiles = (event : any): void => {
    event.preventDefault();
    const fileList = event.target.files;
    for(let key of Object.keys(fileList)) {
      if (key !== 'length') {
        formData.append("file", fileList[key])
      }
    }
  }
  
  // 저장 로직
  const handleSave = useCallback(async () => {
    const editorInfo = editorRef?.current.getInstance();
    let contents = "";
    if (editorInfo.mode === "markdown") {
      contents = editorInfo.getMarkdown();
    } else if (editorInfo.mode === "wysiwyg") {
      contents = editorInfo.getHTML();
    }
    
    try {
      if (id) {
        const request : DocumentDTO = {
          title: titleRef.current?.value!,
          contents : contents,
          contentsType : editorInfo.mode,
          folderId: selectedFolderId
        }
        await saveDocument({id, request});
        setUploadedList([]);
        navigate(`/blog/${id}`);
      } else {
        console.log("저장 전")
        const request : DocumentDTO = {
          title: "",
          contents : "",
          unique: "",
          folderId: ""
        }
        const response = await createDocuments(request);
        
        for (const uploaded of uploadedList) {
          if (uploaded.blob?.name) {
            const copy = await s3Utils.copyFile({fileKey : uploaded.key, newFileKey : uploaded.key.replace("new/", `${response.data.id}/`)})
            const deletes = await s3Utils.deleteFile({fileKey : uploaded.key});
          }
        }
  
        const newContents = contents.replaceAll(
          `https://haries-img.s3.ap-northeast-2.amazonaws.com/new/`,
          `https://haries-img.s3.ap-northeast-2.amazonaws.com/${response.data.id}/`
        );
  
        const unique = generatorUtil.uuid();
        
        const newRequest : DocumentDTO = {
          title: titleRef.current?.value!,
          contents : newContents,
          contentsType : editorInfo.mode,
          unique: unique,
          folderId: selectedFolderId
        }
        const newId = response.data.id;
        await saveDocument({id : newId, request : newRequest});
        // 화면 이동
        navigate(`/blog/${response.data.id}`);
      }
      await getDocumentData(id!);
    } catch (e) {
      // setMessage(prev => {
      //   return {
      //     contents: "글 저장 실패",
      //     isOpen: true
      //   }
      // })
    }
  }, [writing, selectedFolderId, uploadedList]);
  
  // 나가기 로직
  const handleOutPage = useCallback(() => {
    navigate(-1);
  }, []);
  
  useEffect(() => {
    console.log("useEffect 타는지")
    if (id) {
      getDocumentData(id);
    } else {
      resetWriting();
    }
  }, [id]);
  
  return {
    editorRef,
    writing,
    titleRef,
    onUploadImage,
    addFiles,
    handleSave,
    tags,
    setTags,
    tagInput,
    setTagInput,
    getDocumentData,
    handleOutPage,
    selectedFolderId,
    setSelectedFolderId,
    id
  }
  
  
}

export default useEditorWriting;