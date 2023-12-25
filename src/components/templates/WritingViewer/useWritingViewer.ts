import {MouseEvent} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";
import {deleteDocument, getDocument, saveDocument} from "../../../endpoints/documents-endpoints";
import {useRecoilState} from "recoil";
import recoilDocumentsState from "../../../stores/recoil/recoilDocumentsState";
import recoilCommonState from "../../../stores/recoil/recoilCommonState";
import {DocumentDTO} from "../../../types/dto/documentsInfo.d";
import {s3Utils} from "../../../utilities/s3Utils";

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
        const response = await getDocument({id: id});
        setWriting(response.data);
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
  }, [message]);
  
  // 글 조회 실패 메세지
  const handleOnClose = useCallback((event: SyntheticEvent | Event, reasion?: string) => {
    if (reasion === 'clickaway') {
      return;
    }
    setMessage({isOpen : false, contents : ""});
  },[message]);
  
  // 글 삭제
  const handleDelete = useCallback(async (event : MouseEvent<HTMLButtonElement>) => {
    try {
      await deleteDocument({"id": id!});
      setMessage({
        contents : "삭제 성공",
        isOpen : true
      });
      
      const responseList = await s3Utils.getFiles({prefix : id});
      
      if (responseList && responseList.length) {
        const deleteResult = await s3Utils.deleteFiles({Keys : responseList.map(el => {
          return {
            Key : `${el.Key}`,
          }
        })});
        console.log("데이터 삭제", deleteResult)
      }
      
      
      navigate("/blog");   // 이전 화면으로
    } catch (e) {
      setMessage(prev => {
        let data = JSON.parse(JSON.stringify(prev));
        return {
          contents : "글 삭제 실패",
          isOpen : true
        }
      })
    } finally {
      await setTimeout(() => {
        setMessage({
          contents : "",
          isOpen : false
        });
        }, 3000);
    }
  }, [message]);
  
  const handleSaveOpen = useCallback( () => {
    setMessage({
      contents : "",
      isOpen : false
    });
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