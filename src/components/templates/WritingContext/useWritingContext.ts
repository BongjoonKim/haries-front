import {useCallback, useEffect, useState} from "react";
import {getAllDocuments} from "../../../endpoints/documents-endpoints";

function useWritingContext() {
  const [page, setPage] = useState<any>(1);
  const [totalContents, setTotalContents] = useState<number>(0);
  const [writings, setWritings] = useState<Documents.DocumentsDTO[]>([]);
  
  const getPaginationData = useCallback(async (props : PaginationDTO) => {
    
    const response = await getAllDocuments(props);
    console.log("값 확인", response.data.documentsDTO)
    setWritings(response.data.documentsDTO);
    setTotalContents(response.data.totalContents)
  }, [writings, page,totalContents]);
  
  useEffect(() => {
    console.log("여기보자", setPage)
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