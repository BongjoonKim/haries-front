import {MouseEvent} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";
import {deleteDocument, getDocuments} from "../../../endpoints/documents-endpoints";

function useWritingViewer() {
  const viewerRef = useRef<any>();
  const [writing, setWriting] = useState<DocumentDTO>();
  const [messageOpen, setMessageOpen] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState("Fail Brought Writing")
  const {id} = useParams();
  const navigate = useNavigate();

  // 글 조회
  const getDocumentData = useCallback(async () => {
    try {
      const response = await getDocuments({id : id!});
      setWriting(response.data);
      console.log("글 종류", response.data);
      
    } catch (e) {
      setMessageOpen(true);
    }
  }, [warningMessage, messageOpen, writing]);
  
  // 글 조회 실패 메세지
  const handleOnClose = useCallback((event: SyntheticEvent | Event, reasion?: string) => {
    if (reasion === 'clickaway') {
      return;
    }
    setMessageOpen(false);
  },[]);
  
  // 글 삭제
  const handleDelete = useCallback(async (event : MouseEvent<HTMLButtonElement>) => {
    try {
      await deleteDocument({"id": id!});
      setWarningMessage("success delete");
      setMessageOpen(true);
      navigate(-1);   // 이전 화면으로
    } catch (e) {
      setWarningMessage("fail delete");
      setMessageOpen(true);
    }
  }, [messageOpen, warningMessage]);
  
  useEffect(() => {
    getDocumentData();
    
  }, []);
  
  
  return {
    writing,
    messageOpen,
    handleOnClose,
    warningMessage,
    viewerRef,
    handleDelete
  }
}

export default useWritingViewer;