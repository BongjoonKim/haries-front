import {CHANGE_SIDEBAR_VISIBILITY, CHANGE_MOBILE_SIDEBAR_VISIBILITY} from "./sidebarActions";

const initialState = {
    show : false,
    collapse : false
}

const sidebarReducer = (state = initialState, action : { type : any }) => {
    switch (action.type) {
        case CHANGE_SIDEBAR_VISIBILITY:
            return {...state, collapse: !state.collapse};
        case CHANGE_MOBILE_SIDEBAR_VISIBILITY:
            return {...state, show : !state.show };
        default :
            return state;
    }
}

export default sidebarReducer;