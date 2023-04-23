import {widget, ActionTypes } from "../actions/widget.action";

const initialState = {
    message : {
        text : "",
        status : "",
        visible : false,
    },
    loader : {
        visible : false,
        message : ""
    }
};

// reducers
function businessReducers(
    state = initialState,
    action : StoreAction<ActionTypes>
) {
    switch (action.type) {
        case widget.INITIALIZE:
            return state;
        case widget.SHOW_MESSAGE_BOX: {
            const { visible, text, status } = action.payload;
            return { ...state, message : { ...state.message, visible, text, status } }
        }
        case widget.SET_LOADER:
            return {
                ...state,
                loader : {
                    visible : action.payload.visible,
                    message : action.payload.message || ""
                }
            };
        default:
            return state;
    }
}

export default businessReducers;