import {atom, atomFamily} from "recoil";
import {recoilPersist} from "recoil-persist";
import {WRITING_INFO} from "./types";
import moment from "moment";

export const recoilDocumentState = {
  wrtingInfo : atom<DocumentDTO>({
    key: `${WRITING_INFO}`,
    default : {
      id : "",
      titles : "",
      contents : "",
      contentsType : "markdown",
      created : moment().format(),
      initialUser : "",
      modified : moment().format(),
      modifiedUser : "",
    },
    effects_UNSTABLE: [localStorage.persistAtom]
  })
}