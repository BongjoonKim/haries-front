import {useCallback, useEffect, useState} from "react";
import {getAllDocuments} from "../../../endpoints/documents-endpoints";

function useWritingContext() {
  const [page, setPage] = useState<any>(1);
  const [totalContents, setTotalContents] = useState<number>(0);
  const [writings, setWritings] = useState<DocumentsDTO[]>([]);
  
  const getPaginationData = useCallback(async (props : PaginationDTO) => {
    
    const response = await getAllDocuments(props);
    setWritings(response.data.documentsDTO);
    setTotalContents(response.data.totalContents)
  }, [writings, page,totalContents]);
  
  useEffect(() => {
    getPaginationData({page : page, size : 6})
  }, [page]);
  
  // 클릭 시 글 보이게 하기
  const contentsOnClick = useCallback(() => {
  
  }, []);
  
  return {
    getPaginationData,
    writings,
    page,
    setPage,
    totalContents,
    contentsOnClick
  }
}

export default useWritingContext;