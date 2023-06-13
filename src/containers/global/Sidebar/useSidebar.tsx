import {useCallback, useEffect, useState} from "react";
import {FoldersDTO} from "../../../types/dto/foldersDTO";
import {int} from "aws-sdk/clients/datapipeline";
import {getChildFolders, getRootFolder} from "../../../endpoints/folders-endpotins";
import useClipboard from "../../../hooks/state/useClipboard";

interface useSidebarProps {
  parentId : string;
}

function useSidebar(props ?: useSidebarProps) {
  const [mainFolders, setMainFolders] = useState<FoldersDTO[]>();
  const [rootId, setRootId] = useState<string>();
  
  // 루트 폴더 아이디
  
  const getDepthOneFolder = useCallback(async() => {
    const rootFolder = await getRootFolder();
    setRootId(rootFolder.data.id);
    // console.log("루트 폴더", rootFolder.data)
    const mainFolderList = await getChildFolders({parentId : rootFolder.data.id});
    setMainFolders(mainFolderList.data);
    
    // console.log("메인 폴더", mainFolderList)
  }, [rootId, mainFolders]);
  
  // const getSubFolders = useCallback(async (parentId : string) => {
  //   const subFolderList = await getChildFolders({parentId : parentId});
  //   console.log("서브폴더 가져왔는지", subFolderList)
  //   setSubFolders(subFolderList.data);
  // }, [subFolders])
  
  
  useEffect(() => {
    getDepthOneFolder();
  },[])
  
  return {
    rootId,
    mainFolders,
  }
}

export default useSidebar;