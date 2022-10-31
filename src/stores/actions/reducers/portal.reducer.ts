import { portal, ActionTypes } from "../portal.action";

type InitialState = {
    dialog : {
        id : string;
        options : {
            [x : string]: any;
        };
    };
    popup : Popup.status;
    mode : {
        activeSequence : never[] | string[];
        taskItems : ModeComponent.ModeTaskItems<string>;
    }
}

// initial state
const initialState : InitialState = {
    dialog : {
        id : "",
        options : {}
    },
    popup : {},
    mode : {
        activeSequence : [],
        taskItems : {}
    }
}