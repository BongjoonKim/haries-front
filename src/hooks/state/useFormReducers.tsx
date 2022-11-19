import React, {useReducer} from "react";
import reductorUtil from "../../utilities/reductorUtil";
import {formReducer} from "../../reducers/form.reducer";

interface useReducerControllerProps<V> {
    reducer: React.ReducerWithoutAction<V>;
    initialState: V;
    getInitialState?: () => V;
    initialTempValues?:
        | {[x:string]:string | ReadonlyArray<string> | boolean | number | any}
        | undefined;
}

function useFormReducers<T, V>({
    reducer,
    initialState,
    getInitialState
} : useReducerControllerProps<V>) {
    const newReducer = reductorUtil.combineReducers<V, T>(
        formReducer<V, T>(getInitialState?.() || initialState),
        reducer
    )

    const [values, dispatch] = useReducer<(state: V, action: ReducerAction<T, any, keyof V>) => V>(
       newReducer,
       initialState
    );
}

export default useFormReducers;