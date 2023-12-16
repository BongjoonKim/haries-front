import {atom, atomFamily} from "recoil";
import {recoilPersist} from "recoil-persist";
import {UPLOADED_LIST, WRITING_INFO} from "./types.d";
import moment from "moment";
import {DocumentDTO} from "../../../types/dto/documentsInfo";
const { persistAtom } = recoilPersist()
export const recoilDocumentState = {
  writingInfo : atom<DocumentDTO>({
    key: `${WRITING_INFO}`,
    default : {
      id : "",
      title : "",
      contents : "",
      contentsType : "markdown",
      tags: [],
      created : moment().format(),
      initialUser : "",
      modified : moment().format(),
      modifiedUser : "",
    },
    // effects_UNSTABLE: [persistAtom]
  }),
  
  uploadedList: atom<Blob[]>({
    key : `${UPLOADED_LIST}`,
    default : [],
    effects_UNSTABLE: [persistAtom]
  })
  
}