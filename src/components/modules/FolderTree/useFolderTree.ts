import {useCallback, useEffect, useState} from "react";
import {FoldersDTO} from "../../../types/dto/FoldersDTO";
import {getChildFolders, getRootFolder} from "../../../endpoints/folders-endpotins";
import {IsVisibleProps} from "./FolderTree";

function useFolderTree() {
  const [folderList, setFolderList] = useState<FoldersDTO[]>([]);
  const [isVisible, setIsVisible] = useState<IsVisibleProps>({id : "", value : false});
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  
  
  
  
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
  
  // 폴더 명 수정 삭제 클릭 시 Popover 켜지게 도와주는 로직 로직
  const editAndDeleteFolder = useCallback(async (event : any, id: string) => {
    console.log("id", id);
    setAnchorEl(event.currentTarget)
  }, [anchorEl]);
  
  useEffect(() => {
    getAllFolderList();
  }, []);
  
  return {
    folderList,
    isVisible,
    setIsVisible,
    editAndDeleteFolder,
    anchorEl,
    setAnchorEl,
    open
  }
}

export default useFolderTree;