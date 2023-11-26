import {useCallback, useEffect, useRef, useState} from "react";
import {useRecoilState, useResetRecoilState} from "recoil";
import {DocumentDTO} from "../../../types/dto/documentsInfo";
import recoilDocumentsState from "../../../stores/recoil/recoilDocumentsState";
import fileConfig from "../../../appConfig/fileConfig";
import {HookCallback} from "./useWritingContents";
import {useNavigate, useParams} from "react-router-dom";
import {createDocuments, getDocument, getDocumentUnique, saveDocument} from "../../../endpoints/documents-endpoints";
import generatorUtil from "../../../utilities/generatorUtil";

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
  
  
  
  // 수정 화면일 때 조회 로직
  const getDocumentData = useCallback(async (id ?: string) => {
    try {
      if (id) {
        const response = await getDocument({id : id!});
        setWriting({
          ...response.data
        });
      } else {
        resetWriting();
      }
    } catch (e) {
      console.log("getDocumentData", e);
    }
  }, [writing]);
  
  
  // 파일 저장
  const onUploadImage = async (blob: Blob, callback: HookCallback) => {
    try {
      const response = await fileConfig({blob: blob});
      console.log("이미지 저장 결과 값", response)
      callback(response);
    } catch (e) {
      callback("fail image upload");
      console.log("에러 확인", e)
    }
  }
  
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
  
    // const urlRegex = /(https?:\/\/[^\s]+)/g;
    // const urls = contents.match(urlRegex);
    // let targetURL;
    // if (urls) {
    //   targetURL = urls.find(url => url.includes('haries-img'));
    //   if (targetURL) {
    //     console.log(targetURL);
    //   } else {
    //     console.log('해당 URL을 찾을 수 없습니다.');
    //   }
    // } else {
    //   console.log('URL이 없습니다.');
    // }
    // console.log("타겟 url", urls, targetURL?.replace(/\).*/, ''))
  
  
  
    const unique = generatorUtil.uuid();
    
    
    
  
    const request : DocumentDTO = {
      title: titleRef.current?.value!,
      contents : contents,
      contentsType : editorInfo.mode,
      unique: unique,
      // disclose: disclose,
      folderId: selectedFolderId
    }
  
    try {
      if (!!id) {
        await saveDocument({id, request});
        navigate(`/blog/${id}`)
      } else {
        await createDocuments(request);
        const response = await getDocumentUnique({unique: unique});
        navigate(`/blog/${response.data.id}`);

      }
      getDocumentData(id!);
    } catch (e) {
      // setMessage(prev => {
      //   return {
      //     contents: "글 저장 실패",
      //     isOpen: true
      //   }
      // })
    }
  }, [writing, selectedFolderId]);
  
  // 나가기 로직
  const handleOutPage = useCallback(() => {
    navigate(-1);
  }, []);
  
  useEffect(() => {
    getDocumentData(id);
  }, []);
  
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
  }
  
  
}

export default useEditorWriting;