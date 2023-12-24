import {useRef, MouseEvent, useCallback, MutableRefObject, useEffect, useState, lazy} from "react";
import {createDocuments, getDocument, getDocumentUnique, saveDocument} from "../../../endpoints/documents-endpoints";
import MessageBar from "../../widgets/MessageBar";
import {useNavigate, useParams} from "react-router-dom";
import {useRecoilState} from "recoil";
import recoilDocumentsState from "../../../stores/recoil/recoilDocumentsState";
import recoilCommonState from "../../../stores/recoil/recoilCommonState";
import {DocumentDTO} from "../../../types/dto/documentsInfo";
import generatorUtil from "../../../utilities/generatorUtil";
import {cloneDeep} from "lodash";

export type HookCallback = (url: string, text?: string) => void;
function useWritingContents(props : any) {
  const {id} = useParams();
  const formData = new FormData();
  // const editorRef = useRef();
  // const titleRef = useRef<any>();
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

  }
}

export default  useWritingContents;