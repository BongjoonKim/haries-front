import converter from "../utilities/converter";

enum FormActionTypes {
    INITIALIZE = "initialize",
    REPLACE_ITEM_VALUE = "replaceItemValue",
    INITIAL_ITEM_VALUE = "initialItemValue",
    CHANGE_OBJECT_VALUE = "changeObjectValue",
    SET_DATE = "setDate",
}

const formReducer = <T, K>(initialState: T) => (state: T, action: ReducerAction<FormActionTypes | K, any, keyof T>) => {
    let nextState: T = initialState;
    switch (action.type) {
        case FormActionTypes.INITIALIZE:
            return initialState;
        case FormActionTypes.REPLACE_ITEM_VALUE:
            return {
                ...state,
                [action.name as keyof T]: action.value
            }
        case FormActionTypes.INITIAL_ITEM_VALUE:
            return {
                ...state,
                [action.name as keyof T]: (initialState as any)[String(action.name) as keyof T]
            }
        case FormActionTypes.CHANGE_OBJECT_VALUE:
            return converter.changeObjectValue<T>(
                state, String(action.name), action.checked || "");
        case FormActionTypes.SET_DATE:
            return {
                ...state,
                [action.name as keyof T]: {
                    fromDate: action.value.fromDate,
                    toDate: action.value.toDate,
                    comparision: action.value.comparision
                }
            }
        default:
            return state;
    }
}

export { formReducer, FormActionTypes }