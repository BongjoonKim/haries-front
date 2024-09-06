import {atom, selector} from "recoil";
import {recoilPersist} from "recoil-persist";
import {IS_LOGIN, MESSAGE_STATUS, USER_AUTH} from "./types.d";


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
  
  userAuth : atom<any>({
    key : `${USER_AUTH}`,
    default : {},
    effects_UNSTABLE: [persistAtom]
  }),
  
  isLogin : selector<boolean>({
    key : `${IS_LOGIN}`,
    get : ({get}) => {
      const userAuth : UserAuth = get(recoilCommonState.userAuth);
      return !!userAuth?.accessToken && !!userAuth?.grantType?.length;
    }
  }),
}