import {useCallback, useEffect, useState} from "react";
import {getRootFolder, postFolders} from "../../../../endpoints/folders-endpotins";
import generatorUtil from "../../../../utilities/generatorUtil";
import useAxios from "../../../../utilities/useAxios";

export default function useFolder() {
  // 재조회를 알리는 변수
  const [update, setUpdate] = useState(false);
  const {authEP} = useAxios();
  
  const createFolder = useCallback(async (event : any) => {
    try {
      const rootFolder = await getRootFolder();
      const response = await authEP({
        func:postFolders,
        reqBody: {
          parentId : rootFolder.data.id,
          label : "NewFolder",
          uniqueKey : generatorUtil.uuid()
        }
      })
      setUpdate((prev:boolean) => !prev);
    } catch (e) {
      console.log("createFolder error", e);
    }
  }, [update]);
  
  return {
    createFolder,
    update,
    setUpdate
  }
}