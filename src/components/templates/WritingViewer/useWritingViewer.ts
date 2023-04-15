import {useParams} from "react-router-dom";
import {SyntheticEvent, useCallback, useEffect, useState} from "react";
import {getDocuments} from "../../../endpoints/documents-endpoints";

function useWritingViewer() {
  const [title, setTitle] = useState("");
  const [writing, setWriting] = useState("");
  const [MessageOpen, setMessageOpen] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState("Fail Brought Writing")
  const {id} = useParams();
  
  // 글 조회
  const getDocumentData = useCallback(async () => {
    try {
      const response = await getDocuments({id : id!});
      setTitle(response.data.titles);
      setWriting(response.data.htmlContents);
    } catch (e) {
      setMessageOpen(true);
    }
  }, [warningMessage, MessageOpen, title, writing]);
  
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
    title,
    MessageOpen,
    handleOnClose,
    warningMessage
  }
}

export default useWritingViewer;