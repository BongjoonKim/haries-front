import {useCallback, useEffect, useRef, useState} from "react";
import {useRecoilState} from "recoil";
import {DocumentDTO} from "../../../types/dto/documentsInfo";
import recoilDocumentsState from "../../../stores/recoil/recoilDocumentsState";
import fileConfig from "../../../appConfig/fileConfig";
import {HookCallback} from "./useWritingContents";
import {useNavigate, useParams} from "react-router-dom";
import {getDocument} from "../../../endpoints/documents-endpoints";
import generatorUtil from "../../../utilities/generatorUtil";

function useEditorWriting() {
  const editorRef = useRef<any>();
  const [title, setTitle] = useState("");
  const [writing, setWriting] = useRecoilState<DocumentDTO>(recoilDocumentsState.writingInfo);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const {id} = useParams();
  const formData = new FormData();
  const navigate = useNavigate();
  
  
  // 수정 화면일 때 조회 로직
  const getDocumentData = useCallback(async (id : string) => {
    try {
      const response = await getDocument({id : id!});
      setWriting(response.data);
    } catch (e) {
      console.log("getDocumentData", e);
    }
  }, [writing]);
  
  
  const onUploadImage = async (blob: Blob, callback: HookCallback) => {
    try {
      const response = await fileConfig({blob: blob});
      callback(response);
    } catch (e) {
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
    console.log("editorRef", editorRef);
    const editorInfo = editorRef?.current.getInstance();
    let contents = "";
    if (editorInfo.mode === "markdown") {
      contents = editorInfo.getMarkdown();
    } else if (editorInfo.mode === "wysiwyg") {
      contents = editorInfo.getHTML();
    }
    const unique = generatorUtil.uuid();
    
    console.log("contents", contents)
  }, []);
  
  const titleWrite = useCallback((event : any) => {
    setWriting((prev: DocumentDTO) => {return {...prev, title : event.taget.value }});
  }, [writing]);
  
  // 태그 입력 함수
  const addTag = useCallback( (event : any) => {
    if (event.code === "Enter") {
      if (tagInput !== "" && !tags.includes(tagInput)) {
        setTags((prev : string[]) => [...prev, tagInput]);
        setTagInput("");
      }
    }
  }, [tags, tagInput]);
  
  const writeTag = useCallback((event : any) => {
  
  }, [tagInput, tags])
  
  // 태그 삭제 함수
  const tagDelete = useCallback((event : any) => {
    const deleteTag = event.currentTarget.parentElement.parentElement.children[0].innerHTML.slice(1);
    setTags((prev : string[]) => {
      return prev.filter(el => el !== deleteTag);
    })
  }, [tags]);
  
  // 나가기 로직
  const handleOutPage = useCallback(() => {
    navigate(-1);
  }, []);
  
  useEffect(() => {
    if (id) {
      getDocumentData(id);
    }
  }, []);
  
  return {
    editorRef,
    writing,
    title,
    titleWrite,
    onUploadImage,
    addFiles,
    handleSave,
    addTag,
    tags,
    setTags,
    tagInput,
    setTagInput,
    tagDelete,
    getDocumentData,
    handleOutPage,
    selectedFolderId,
    setSelectedFolderId,
    writeTag
  }
  
  
}

export default useEditorWriting;