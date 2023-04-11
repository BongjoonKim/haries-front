import {useCallback, useEffect, useState} from "react";
import {getAllDocuments} from "../../../endpoints/documents-endpoints";

function useWritingContext() {
  const [page, setPage] = useState<any>(1);
  const [writings, setWritings] = useState<DocumentsDTO[]>([]);
  
  const getPaginationData = useCallback(async (props : PaginationDTO) => {
    const response = await getAllDocuments(props);
    setWritings(response.data);
  }, [writings, page]);
  
  useEffect(() => {
    console.log("여기보자", setPage)
    getPaginationData({page : page, size : 6})
  }, [page]);
  
  return {
    getPaginationData,
    writings,
    page,
    setPage
  }
}

export default useWritingContext;