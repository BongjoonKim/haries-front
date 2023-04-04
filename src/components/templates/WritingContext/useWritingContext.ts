import {useCallback, useEffect, useState} from "react";
import {getAllDocuments} from "../../../endpoints/documents-endpoints";
import {SubContextProps} from "./types";

function useWritingContext() {
  const [page, setPage] = useState<any>(1);
  const [writings, setWritings] = useState<SubContextProps[]>([]);
  
  const getPaginationData = useCallback(async (props : PaginationDTO) => {
    const response = await getAllDocuments(props);
    setWritings(response.data);
    console.log("ㄷㅔ이터", response.data);
  }, [writings]);
  
  useEffect(() => {
    console.log("여기보자", setPage)
    const foo = async () => {
      await getPaginationData({page : page, size : 5});
    };
    
    foo();
  }, [page]);
  
  return {
    getPaginationData,
    page,
    setPage
  }
}

export default useWritingContext;