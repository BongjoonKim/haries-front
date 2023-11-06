import {useCallback, useEffect, useState} from "react";
import {MenuType} from "../../../model/common/common-model";
import {retrieveMenus} from "../../../endpoints/common-endpoints";
import {lowerCase} from "lodash";

function useGlobalHeader() {
  const [menuList, setMenuList] = useState<MenuType[]>([]);
  const getAllMenuList = useCallback(async () => {
    const response = await retrieveMenus();
    setMenuList(response.data.filter(el => ['blog','chatgpt'].includes(lowerCase(el.menuName))));
  }, [menuList]);
  
  useEffect(() => {
    getAllMenuList();
  }, []);
  
  return {
    getAllMenuList,
    menuList
  }
}

export default useGlobalHeader;