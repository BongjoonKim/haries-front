import {useParams} from "react-router-dom";
import {SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";
import {getDocuments} from "../../../endpoints/documents-endpoints";

function useWritingViewer() {
  const viewerRef = useRef<any>();
  const [writing, setWriting] = useState<DocumentDTO>();
  const [MessageOpen, setMessageOpen] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState("Fail Brought Writing")
  const {id} = useParams();

  
  
  
  // 글 조회
  const getDocumentData = useCallback(async () => {
    try {
      const response = await getDocuments({id : id!});
      setWriting(response.data);
      console.log("글 종류", response.data);
      
    } catch (e) {
      setMessageOpen(true);
    }
  }, [warningMessage, MessageOpen, writing]);
  
  const handleOnClose = useCallback((event: SyntheticEvent | Event, reasion?: string) => {
    if (reasion === 'clickaway') {
      return;
    }
    setMessageOpen(false);
  },[]);
  
  useEffect(() => {
    getDocumentData();
    
  }, []);
  
  
  return {
    writing,
    MessageOpen,
    handleOnClose,
    warningMessage,
    viewerRef,
  }
}

export default useWritingViewer;