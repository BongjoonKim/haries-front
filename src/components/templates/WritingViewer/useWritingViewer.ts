import {MouseEvent} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";
import {deleteDocument, getDocuments, saveDocument} from "../../../endpoints/documents-endpoints";
import {useRecoilState} from "recoil";
import recoilDocumentsState from "../../../stores/recoil/recoilDocumentsState";
import recoilCommonState from "../../../stores/recoil/recoilCommonState";
import {DocumentDTO} from "../../../types/dto/documentsInfo.d";

function useWritingViewer() {
  const viewerRef = useRef<any>();
  const [writing, setWriting] = useState<DocumentDTO>();
  const [message, setMessage]  = useRecoilState<{isOpen : boolean, contents : string}>(recoilCommonState.messageOpener);
  const {id} = useParams();
  
  const navigate = useNavigate();

  // 글 조회
  const getDocumentData = useCallback(async (id : string) => {
    try {
      if (!!id) {
        const response = await getDocuments({id: id});
        setWriting(response.data);
        console.log("글 종류", response.data);
      }
    } catch (e) {
      setMessage(prev => {
        let data = JSON.parse(JSON.stringify(prev));
        return {
          contents : "글 불러오기 실패",
          isOpen : true
        }
      })
    }
  }, []);
  
  // 글 조회 실패 메세지
  const handleOnClose = useCallback((event: SyntheticEvent | Event, reasion?: string) => {
    if (reasion === 'clickaway') {
      return;
    }
    setMessage({isOpen : false, contents : ""});
  },[]);
  
  // 글 삭제
  const handleDelete = useCallback(async (event : MouseEvent<HTMLButtonElement>) => {
    try {
      await deleteDocument({"id": id!});
      setMessage({
        contents : "삭제 성공",
        isOpen : true
      });
      navigate(-1);   // 이전 화면으로
    } catch (e) {
      setMessage(prev => {
        let data = JSON.parse(JSON.stringify(prev));
        return {
          contents : "글 삭제 실패",
          isOpen : true
        }
      })
    }
  }, []);
  
  const handleSaveOpen = useCallback( () => {
    console.log("여기여기", id)
    navigate(`/blog/writing/${id}`);
  }, []);
  
  useEffect(() => {
    if (!!id) {
      getDocumentData(id!);
    } else {
      setWriting(undefined);
    }
  }, []);
  
  
  return {
    id,
    writing,
    handleOnClose,
    message,
    handleSaveOpen,
    viewerRef,
    handleDelete
  }
}

export default useWritingViewer;