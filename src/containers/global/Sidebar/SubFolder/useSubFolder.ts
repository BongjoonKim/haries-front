import {useCallback, useEffect, useState} from "react";
import {FoldersDTO} from "../../../../types/dto/foldersDTO";
import {getChildFolders} from "../../../../endpoints/folders-endpotins";
import {SubFolderProps} from "./SubFolder";

function useSubFolder(props : SubFolderProps) {
  const [subFolders , setSubFolders] = useState<FoldersDTO[]>();
  
  const getSubFolders = useCallback(async (parentId: string) => {
    const response = await getChildFolders({parentId : parentId});
    setSubFolders(response.data);
  }, [subFolders]);
  
  useEffect( () => {
    getSubFolders(props.parentId);
  }, [props.parentId]);
  
  return {
    subFolders,
    setSubFolders
  }
}

export default useSubFolder;