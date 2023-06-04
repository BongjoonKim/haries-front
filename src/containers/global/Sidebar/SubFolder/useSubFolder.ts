import {useCallback, useEffect, useState} from "react";
import {FoldersDTO} from "../../../../types/dto/foldersDTO";
import {getChildFolders} from "../../../../endpoints/folders-endpotins";
import {SubFolderProps} from "./SubFolder";

function useSubFolder(props : SubFolderProps) {
  // const [subFolders , setSubFolders] = useState<FoldersDTO[]>();
  let data : any = [];
  const getSubFolders = useCallback(async (parentId: string) => {
    data = await getChildFolders({parentId : parentId});
  }, []);
  
  useEffect( () => {
     (async () => {
      await getSubFolders(props.parentId);
    })();
    
  }, []);
  
  return {
    data
  }
}

export default useSubFolder;