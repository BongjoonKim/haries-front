import {useCallback, useEffect, useState} from "react";
import {MenuType} from "../../../model/common/common-model";
import {retrieveMenus} from "../../../endpoints/common-endpoints";
import {lowerCase} from "lodash";
import {useRecoilState, useRecoilValue} from "recoil";
import recoilCommonState from "../../../stores/recoil/recoilCommonState";

function useGlobalHeader() {
  const [menuList, setMenuList] = useState<MenuType[]>([]);
  const isLogin = useRecoilValue(recoilCommonState.isLogin);
  
  const getAllMenuList = useCallback(async () => {
    const response = await retrieveMenus();
    
    setMenuList(() => {
      console.log("로그인 여부 확인", isLogin)
      if (isLogin) {
        return response.data.filter(el => ['chatgpt', 'blog', 'admin'].includes(lowerCase(el.menuName)))
      } else {
        return response.data.filter(el => ['chatgpt', 'blog'].includes(lowerCase(el.menuName)))
      }
    });
  }, [menuList, isLogin]);
  
  useEffect(() => {
    getAllMenuList();
  }, []);
  
  useEffect(() => {
    getAllMenuList();
  }, [isLogin])
  
  return {
    getAllMenuList,
    menuList
  }
}

export default useGlobalHeader;