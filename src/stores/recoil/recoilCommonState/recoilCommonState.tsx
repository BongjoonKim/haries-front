import {atom, selector} from "recoil";
import {recoilPersist} from "recoil-persist";
import {
  ACCESS_TOKEN, ERROR_INFO,
  ERROR_INFO_TYPE,
  IS_LOGIN,
  LOGIN_ROLES,
  LOGIN_USER_DATA,
  MESSAGE_STATUS,
  MODAL_STATE
} from "./types.d";
import {ModeComponent} from "../../../types/mode";
import {getCookie} from "../../../utilities/cookieUtils";
import {getLoginUser, isLogined, udtRefreshToken} from "../../../endpoints/login-endpoints";


const {persistAtom} = recoilPersist({
  key: "sessionStorage",
  storage : sessionStorage
});

interface UserAuth extends TokenDTO {
  roles : string[];
}

export const recoilCommonState = {
  messageOpener : atom<{isOpen : boolean, contents : string}>({
    key: `${MESSAGE_STATUS}`,
    default : {
      isOpen : false,
      contents : ""
    },
    // effects_UNSTABLE: [persistAtom]
  }),
  
  // 로그인한 사용자 정보
  loginUserData : atom<UsersDTO | null>({
    key : `${LOGIN_USER_DATA}`,
    default : null
  }),
  
  isLogin : selector<boolean>({
    key : `${IS_LOGIN}`,
    get : ({get}) => {
      const userData = get(recoilCommonState.loginUserData) as UsersDTO | null;
      return !!userData;
    }
  }),
  
  getLoginRoles : selector<string[] | undefined>({
    key : `${LOGIN_ROLES}`,
    get : ({get}) => {
     const userData = get(recoilCommonState.loginUserData) as UsersDTO | null;
     return userData?.roles;
    }
  }),
  
  
  modalState: atom<ModeComponent.ModeStatus<any>>({
    key : `${MODAL_STATE}`,
    default : {},
  }),
  
  errInfo: atom<ERROR_INFO_TYPE>({
    key : `${ERROR_INFO}`,
    default : {
      isOpen : false,
      statusText : "",
      status : 200,
      data : {},
    }
  })
}