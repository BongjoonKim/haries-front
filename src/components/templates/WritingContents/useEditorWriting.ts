import {useCallback, useEffect, useRef, useState} from "react";
import {useRecoilState, useResetRecoilState} from "recoil";
import {DocumentDTO} from "../../../types/dto/documentsInfo";
import recoilDocumentsState from "../../../stores/recoil/recoilDocumentsState";
import {HookCallback} from "./useWritingContents";
import {useNavigate, useParams} from "react-router-dom";
import {createDocuments, getDocument, getDocumentUnique, saveDocument} from "../../../endpoints/documents-endpoints";
import generatorUtil from "../../../utilities/generatorUtil";
import useFiles from "../../../appConfig/file";
import fileProcesses from "../../../appConfig/file";
import recoilDocumentState from "../../../stores/recoil/recoilDocumentsState";
import {startsWith} from "lodash";
import fileConfig from "../../../appConfig/file/fileConfig";

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
      const {uploadFile} = fileProcesses({
        dirName: id,
        blob : blob,
        uploadedList : uploadedList,
        setUploadedList : setUploadedList
      });
      const response = await uploadFile();
      // const response = await fileConfig({blob: blob});
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
    const unique = generatorUtil.uuid();
    
  
    try {
      console.log("글 값 확인", contents)
      const newContents = contents.replace(
        `https://haries-img.s3-ap-northeast-2.amazonaws.com/new/`,
        `https://haries-img.s3-ap-northeast-2.amazonaws.com/${titleRef.current?.value}/`
      );
      const request : DocumentDTO = {
        title: titleRef.current?.value! || "간드앙2",
        contents : newContents,
        contentsType : editorInfo.mode,
        unique: unique,
        folderId: selectedFolderId
      }
      if (id) {
        await saveDocument({id, request});
        setUploadedList([]);
        navigate(`/blog/${id}`)
      } else {
        await createDocuments(request);
        const response = await getDocumentUnique({unique: unique});
        
        // 파일 신규 추가
        for(const blob of uploadedList) {
          const S3Client = fileConfig({
            dirName: titleRef.current?.value || "간드앙2",
          });
          const file = new File([blob], generatorUtil.uuid(), {type:blob.type});
  
          const uploadResponse = await S3Client.uploadFile(file);
          
        }
        
        // 파일 삭제
        const {getAllFiles} = fileProcesses();
        const allFiles = await getAllFiles();
        console.log("모든 파일 보기", allFiles.data.Contents)
        if (allFiles.data.Contents) {
          for (const file of allFiles.data.Contents) {
            if (startsWith(file.Key, "new/")) {
              console.log("키값 확인", file.Key)
              const S3Client = fileConfig();
              const deleteResponse = await S3Client.deleteFile(file.Key);
              console.log("deleteResponse", deleteResponse);
            }
          }
        }
        
        // 파일 업로드
        
        // 화면 이동
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
  }, [writing, selectedFolderId, uploadedList]);
  
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