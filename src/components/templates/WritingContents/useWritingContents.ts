import {useRef, MouseEvent, useCallback, MutableRefObject, useEffect, useState, lazy} from "react";
import {createDocuments, getDocument, getDocumentUnique, saveDocument} from "../../../endpoints/documents-endpoints";
import MessageBar from "../../widgets/MessageBar";
import {useNavigate, useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import recoilDocumentsState from "../../../stores/recoil/recoilDocumentsState";
import recoilCommonState from "../../../stores/recoil/recoilCommonState";
import {DocumentDTO} from "../../../types/dto/documentsInfo";
import generatorUtil from "../../../utilities/generatorUtil";
import fileConfig from "../../../appConfig/fileConfig";
import {cloneDeep} from "lodash";

export type HookCallback = (url: string, text?: string) => void;
function useWritingContents() {
  const {id} = useParams();
  const formData = new FormData();
  const editorRef = useRef<any>();
  const titleRef = useRef<any>();
  const [writing, setWriting] = useRecoilState<DocumentDTO>(recoilDocumentsState.writingInfo);
  const [message, setMessage]  = useRecoilState<{isOpen : boolean, contents : string}>(recoilCommonState.messageOpener);
  const navigate = useNavigate();
  const [tags, setTags] = useState<any>([]);
  const tagRef = useRef<any>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const [disclose, setDisclose] = useState<boolean>(false);
  
  // 수정 화면일 경우
  
  
  // 수정 화면일 경우 조회 로직
  const getDocumentData = useCallback(async (id : string) => {
    try {
      const response = await getDocument({id : id!});
      setWriting(response.data);
      //
      // if (editorRef.current !== undefined && editorRef.current !== null) {
      //   console.log("커런트 확인", editorRef.current);
      //   console.log("커런트 확인", editorRef.current);
      //   if (response.data.contentsType === "markdown") {
      //     editorRef.current?.setMarkdown(response.data.contents)
      //   }
      //   else if (response.data.contentsType === "wysiwyg") {
      //     editorRef.current?.setHTML(response.data.contents);
      //   }
      //   else {
      //     editorRef.current?.setMarkdown(response.data.contents)
      //   }
      // }
    } catch (error) {
      setMessage(prev => {
        return {
          contents : `글 데이터 가져오터기 실패 : ${error}`,
          isOpen: true
        }
      });
    }
  }, [writing, message]);
  
  
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
    const unique = generatorUtil.uuid();
    
    const request : DocumentDTO = {
      title: titleRef.current.value,
      contents : contents,
      contentsType : editorInfo.mode,
      unique: unique
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
    } catch (e) {
      setMessage(prev => {
        return {
          contents : "글 저장 실패",
          isOpen : true
        }
      })
    } finally {

    }
    
  }, [message, selectedFolderId]);
  
  // 이미지 저장 로직
  const onUploadImage = async (blob: Blob, callback: HookCallback) => {
    try {
      const response = await fileConfig({blob: blob});
      callback(response);
    } catch (e) {
      console.log("에러 확인", e)
    }
  }
  
  // 태그 입력 함수
  const addTag = useCallback(async (event : any) => {
    const data = tagRef.current.value;
    if (event.code === "Enter") {
      // event.preventDefault();
      console.log("data", data, tags)
      if (data !== "" && !tags.includes(data)) {        // 이미 등록한 tag는 더 등록할 수 없다
        setTags((prev : string[]) => [...prev, data]);
        tagRef.current.value = "";
      }
    }
  }, [tags]);
  
  // 태그 삭제 함수
  const tagDelete = useCallback((event : any) => {
    // console.log("삭제 이벤트 확인", event.currentTarget.parentElement.parentElement.children[0].innerHTML);
    const deleteTag = event.currentTarget.parentElement.parentElement.children[0].innerHTML.slice(1);
    // console.log("deleteTag", deleteTag)
    setTags((prev : string[]) => {
      return prev.filter(el => el !== deleteTag);
    })
  }, [tags]);
  
  useEffect(() => {
    if (!!id) {
      getDocumentData(id);
    }
  }, []);
  
  // 나가기 로직
  const handleOutPage = useCallback(() => {
    navigate(-1);
  }, []);
  
  return {
    addFiles,
    editorRef,
    titleRef,
    handleSave,
    onUploadImage,
    writing,
    handleOutPage,
    tags,
    setTags,
    tagRef,
    addTag,
    setSelectedFolderId,
    setDisclose,
    tagDelete
  }
}

export default  useWritingContents;