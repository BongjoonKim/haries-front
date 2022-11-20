import converter from "../utilities/converter";

enum FormActionTypes {
    INITIALIZE = "initialize",
    REPLACE_ITEM_VALUE = "replaceItemValue",
    INITIAL_ITEM_VALUE = "initialItemValue",
    INITIAL_MULTI_VALUES = "initialMultiValues",
    REPLACE_GENERAL_VALUE = "replaceGeneralValue",
    CHANGE_OBJECT_VALUE = "changeObjectValue",
    RETURN_CHANGE_SPECIFIED_OBJECT_VALUES = "returnChangeSpecifiedObjectValues",
    SET_DATE = "setDate",
    ADD_ARRAY_ITEM = "addArrayItem",
    REMOVE_ARRAY_ITEM = "removeArrayItem"
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
        case FormActionTypes.REPLACE_GENERAL_VALUE:
            Object.keys(action.value)?.forEach(key => {
                nextState = {
                    ...nextState,
                    [key]: action.value[key]
                }
            })

            return {...state, ...nextState};
        case FormActionTypes.INITIAL_ITEM_VALUE:
            return {
                ...state,
                [action.name as keyof T]: (initialState as any)[String(action.name) as keyof T]
            }
        case FormActionTypes.INITIAL_MULTI_VALUES:
            return converter.dynamicStringToInitialObject({
                state,
                initialState,
                name: action.name as string
            })
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
        case FormActionTypes.RETURN_CHANGE_SPECIFIED_OBJECT_VALUES:
            return converter.dynamicStringToObject({
                state,
                name: action.name as string,
                value: action.value
            })
        case FormActionTypes.ADD_ARRAY_ITEM:
            return converter.objectArrayAddItem<T>(state, String(action.name), action.value);
        case FormActionTypes.REMOVE_ARRAY_ITEM:
            return converter.objectRemoveItem<T>(state,String(action.name));
        default:
            return state;
    }
}

export { formReducer, FormActionTypes }