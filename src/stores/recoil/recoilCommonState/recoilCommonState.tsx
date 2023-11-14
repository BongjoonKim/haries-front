import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
import {MESSAGE_STATUS} from "./types.d";


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
  
  selectedChannelId: atom<string>({
    key: "sdfsdf",
    default: "",
    effects_UNSTABLE: [persistAtom]
  })
}