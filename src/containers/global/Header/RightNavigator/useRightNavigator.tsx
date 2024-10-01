import {SyntheticEvent, useRef, useState} from "react";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import recoilCommonState from "../../../../stores/recoil/recoilCommonState";
import {logout} from "../../../../endpoints/login-endpoints";

export default function useRightNavigator() {
  const menuRef = useRef<any>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const loginUser = useRecoilValue(recoilCommonState.loginUserData);
  const resetLoginUser = useResetRecoilState(recoilCommonState.loginUserData)
  const [errInfo, setErrInfo] = useRecoilState(recoilCommonState.errInfo);
  
  
  const handleListKeyDown = (event: any) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setMenuOpen(false);
    } else if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  }
  
  const handleClose = (event : SyntheticEvent | Event) => {
    if (menuRef.current && menuRef.current.contains(event.target)) {
      return;
    }
    setMenuOpen(false);
  };
  
  const doLogout = async() => {
    try {
      const res = await logout();
      if (res.status === 200) {
        resetLoginUser();
      }
    } catch (e) {
      setErrInfo({
        isOpen : true,
        statusText : e?.toString()
      });
    }
  }
  
  return {
    menuRef,
    menuOpen,
    setMenuOpen,
    loginUser,
    handleClose,
    handleListKeyDown,
    doLogout,
  }
}