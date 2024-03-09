import {atom, atomFamily} from "recoil";
import {recoilPersist} from "recoil-persist";
import {FILTER_INFO, FilterData, THUMBNAILCOLOR, UPLOADED_LIST, WRITING_INFO} from "./types.d";
import moment from "moment";
import {DocumentDTO} from "../../../types/dto/documentsInfo";
import {FilterDataDTO} from "../../../types/dto/filterDataDTO";

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
  
  uploadedList: atom<any[]>({
    key : `${UPLOADED_LIST}`,
    default : [],
    effects_UNSTABLE: [persistAtom]
  }),
  
  filterData: atom<FilterDataDTO>({
    key: `${FILTER_INFO}`,
    default : FilterData
  }),
  
  thumbnailColor: atom<string[]>({
    key : `${THUMBNAILCOLOR}`,
    default : [
      "#FFD745",
      "#FFBE45",
      "#FF8345",
      "#FFE70F",
      "#FFA545"
    ]
  })
}