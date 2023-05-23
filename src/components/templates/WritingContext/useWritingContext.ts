import {useCallback, useEffect, useState} from "react";
import {getAllDocuments} from "../../../endpoints/documents-endpoints";
import {DocumentDTO, PaginationDTO} from "../../../types/dto/documentsInfo.d";
import {useRecoilState, useRecoilValue} from "recoil";
import recoilCommonState from "../../../stores/recoil/recoilCommonState";

function useWritingContext() {
  const [page, setPage] = useState<any>(1);
  const [totalContents, setTotalContents] = useState<number>(0);
  const [writings, setWritings] = useState<DocumentDTO[]>([]);
  const message = useRecoilValue(recoilCommonState.messageOpener)
  
  const getPaginationData = useCallback(async (props : PaginationDTO) => {
    
    console.log("props", props)
    const response = await getAllDocuments(props);
    console.log("리스폰스", response.data)
    setWritings(response.data.documentsDTO);
    setTotalContents(response.data.totalContents)
  }, [writings, page,totalContents]);
  
  useEffect(() => {
    getPaginationData({page : page, size : 6})
  }, [page, message]);
  
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