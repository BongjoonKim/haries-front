import {useCallback, useEffect, useState} from "react";
import {MenuType} from "../../../model/common/common-model";
import {retrieveMenus} from "../../../endpoints/common-endpoints";
import {lowerCase} from "lodash";
import {useRecoilState, useRecoilValue} from "recoil";
import recoilCommonState from "../../../stores/recoil/recoilCommonState";
import {endpointUtils} from "../../../utilities/endpointUtils";
import {useAuth} from "../../../appConfig/AuthContext";

function useGlobalHeader() {
  const [menuList, setMenuList] = useState<MenuType[]>([]);
  const isLogin = useRecoilValue(recoilCommonState.isLogin);
  const userAuth = useRecoilValue(recoilCommonState.userAuth);
  const {accessToken, setAccessToken} = useAuth();
  
  
  const getAllMenuList = useCallback(async () => {
    // const res = await endpointUtils.authAxios({
    //   func: retrieveMenus,
    //   accessToken: accessToken,
    //   setAccessToken: setAccessToken
    // })
    // console.log("res", res)
    
    const response = await retrieveMenus();
    
    setMenuList(() => {
      if (isLogin) {
        if (userAuth?.roles?.includes("ADMIN")) {
          return response.data.filter(el => ['chatgpt', 'blog', 'dalle', 'admin'].includes(lowerCase(el.menuName)))
        } else {
          return response.data.filter(el => ['chatgpt', 'blog', 'dalle'].includes(lowerCase(el.menuName)))
  
        }
      } else {
        return response.data.filter(el => ['blog'].includes(lowerCase(el.menuName)))
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