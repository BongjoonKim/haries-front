import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
import {IS_LOGIN, MESSAGE_STATUS} from "./types.d";


const {persistAtom} = recoilPersist();

export const recoilCommonState = {
  messageOpener : atom<{isOpen : boolean, contents : string}>({
    key: `${MESSAGE_STATUS}`,
    default : {
      isOpen : false,
      contents : ""
    },
    // effects_UNSTABLE: [persistAtom]
  }),
  isLogin : atom<boolean>({
    key : `${IS_LOGIN}`,
    default : false,
  }),
  
  selectedChannelId: atom<string>({
    key: "sdfsdf",
    default: "",
    effects_UNSTABLE: [persistAtom]
  })
}