import moment, {now} from "moment";
import {ActionTypes, DocumentConstants} from "../actions/documents.action";

const initialState: DocumentsDTO= {
  titles : "",
  htmlContents : "",
  created : moment(now()).format("YYYY-MM-DD"),
  initialUser : "user"
}

function DocumentsReducer(
  state = initialState,
  action : StoreAction<ActionTypes>
) {
  switch (action.type) {
    case DocumentConstants.SAVE:
      console.log("state", state);
      console.log("action", action);
      return state;
  }
}

export default DocumentsReducer;