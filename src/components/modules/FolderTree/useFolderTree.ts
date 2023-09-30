import {useCallback, useEffect, useState} from "react";
import {FoldersDTO} from "../../../types/dto/foldersDTO";
import {getChildFolders, getRootFolder} from "../../../endpoints/folders-endpotins";

function useFolderTree() {
  const [folderList, setFolderList] = useState<FoldersDTO[]>([]);
  
  
  // 모든 폴더 정보 생성
  const getAllFolderList = useCallback(async () => {
    try {
      const rootFolder = await getRootFolder();
      const folderData = await getChildFolders({parentId : rootFolder.data.id});
      setFolderList(folderData.data);
    } catch (e) {
      console.log("getAllFolderList Error", e);
    }
  }, [folderList]);
  
  useEffect(() => {
    getAllFolderList();
  }, []);
  
  return {
    folderList
  }
}

export default useFolderTree;