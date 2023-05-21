import moment, {now} from "moment";
import {ActionTypes, DocumentConstants} from "../actions/documents.action";
import {DocumentDTO} from "../../../types/dto/documentsInfo";

const initialState: DocumentDTO= {
  titles : "",
  contents : "",
  contentsType : "markdown",
  created : moment().format("YYYY-MM-DD"),
  initialUser : "user"
}

function DocumentsReducer(
  state = initialState,
  action : StoreAction<ActionTypes>
) {
  switch (action.type) {
    case DocumentConstants.INITIALIZE:
      return initialState;
    case DocumentConstants.SAVE:
      console.log("state", state);
      console.log("action", action);
      return {...state};
    default:
      return state
  }
}

export default DocumentsReducer;