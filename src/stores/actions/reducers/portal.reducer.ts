import { portal, ActionTypes } from "../portal.action";
import { actionType as mode } from "src/components/modules/Mode";
import {ModeComponent} from "../../../types/mode";

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
};

// reducers
export default function portalReducers(
    state = initialState,
    action : StoreAction<ActionTypes>
) {
    const tmpState = state;
    switch (action.type) {
        case portal.INITIALIZE:
            return initialState;
        case mode.ADD_A
    }
}