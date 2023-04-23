import { portal, ActionTypes } from "../actions/portal.action";
import {actionType as mode} from "../../../components/modules/Mode";
import {ModeComponent} from "../../../types/mode";
import converter from "../../../utilities/converter";

type InitialState = {
    dialog : {
        id : string;
        options : {
            [x : string]: any;
        };
    };
    popup : Popup.status;
    mode : {
        activeSequence : any[];
        taskItems : ModeComponent.ModeTaskItems;
    }
}

// initial state
const initialState : any = {
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
    const thisState = state;
    switch (action.type) {
        case portal.INITIALIZE:
            return initialState;
        case mode.ADD_ACTIVE_SEQUENCE_MODE:
            return {
                ...state,
                mode: {
                    ...state.mode,
                    activeSequence: [
                        action.payload.name,
                        ...state.mode.activeSequence.filter(
                            (val:string) => val !== action.payload.name
                        )
                    ]
                }
            };
        case mode.REMOVE_ACTION_SEQUENCE_MODE:
            return {
                ...state,
                mode: {
                    ...state.mode,
                    activeSequence: state.mode.activeSequence.filter(
                        (val: any) => val !== action.payload.name
                    )
                }
            }
        case mode.ADD_TASK_ITEM_MODE:
            return {
                ...state,
                mode: {
                    taskItems: {
                        ...state.mode.taskItems,
                        [action.payload.name]: {
                            name: action.payload.name,
                            title: action.payload.title
                        }
                    }
                }
            }
        case mode.REMOVE_TASK_ITEM_MODE:
            return {
                ...state,
                mode: {
                    ...state.mode,
                    taskItems: converter.objectRemoveKey(
                        state.mode.taskItems,
                        action.payload.name
                    )
                }
            }
        case portal.SET_DIALOG:
            return {
                ...state,
                dialog: {
                    id: action.payload.id,
                    options: action.payload.options || {},
                }
            }
        case portal.ADD_POPUP:
            return {
                ...state,
                popup: {
                    [String(action.payload.id)]: {
                        id: action.payload.id,
                        options: {...action.payload.options}
                    }
                }
            }
        case portal.REMOVE_POPUP:
            delete thisState.popup[action.payload.id];
            return {
                ...state,
                popup: thisState.popup
            }
        default:
            return state;
    }
}