import {useCallback} from "react";
import {getAllDocuments} from "../../../endpoints/documents-endpoints";

function useWritingContext() {
  const getPaginationData = useCallback(async (props : any) => {
    const response = await getAllDocuments(props);
  }, []);
  
  return {
    getPaginationData
  }
}

export default useWritingContext;