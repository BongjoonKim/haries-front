import {atom, selector} from "recoil";
import {recoilPersist} from "recoil-persist";
import {ACCESS_TOKEN, IS_LOGIN, LOGIN_USER_DATA, MESSAGE_STATUS, MODAL_STATE} from "./types.d";
import {ModeComponent} from "../../../types/mode";
import {useAuth} from "../../../appConfig/AuthContext";
import {getCookie} from "../../../utilities/cookieUtils";
import {isLogined, udtRefreshToken} from "../../../endpoints/login-endpoints";


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
  
  accessToken : atom<string | null | undefined>({
    key : `${ACCESS_TOKEN}`,
    default : null
  }),
  
  // 로그인한 사용자 정보
  loginUserData : selector<any>({
    key : `${LOGIN_USER_DATA}`,
    get: ({get}) => {
      return {};
    }
  }),
  
  isLogin : selector<any>({
    key : `${IS_LOGIN}`,
    get : async ({get}) => {
      // const accessToken = getCookie("accessToken");
      // const refreshToken = getCookie("refreshToken");
      try {
        const res = await isLogined();
        return res.data;
      } catch (e) {
        console.log("isLogin fail", e);
      }
    }
  }),
  modalState: atom<ModeComponent.ModeStatus<any>>({
    key : `${MODAL_STATE}`,
    default : {},
  })
}