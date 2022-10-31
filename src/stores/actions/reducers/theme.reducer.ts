import {CHANGE_THEME_TO_DARK, CHANGE_THEME_TO_LIGHT} from "../themeActions";

const initialState = {
    className: "light"
};

const themeReducer = (state = initialState, action : {type : any}) => {
    switch (action.type) {
        case CHANGE_THEME_TO_LIGHT:
            return { className: "light" }
        case CHANGE_THEME_TO_DARK:
            return { className: "dark" }
        default:
            return state;
    }
}

export default themeReducer;