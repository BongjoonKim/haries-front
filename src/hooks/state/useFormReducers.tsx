import React, {useReducer} from "react";
import reductorUtil from "../../utilities/reductorUtil";
import {formReducer} from "../../reducers/form.reducer";
import useConnectDispatch from "./useConnectDispatch";
import useObjectState from "./useObjectState";

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

    const {handleDispatch, handleInitialValues, getDispatchProps} = useConnectDispatch<T, keyof V, V>({
        dispatch,
        values: values as V
    });

    const {
        values: tempValues,
        setValues: setTempValues,
        handleChangeValue: handleChangeTempValue,
        handleInitialValue: handleInitialTempValue,

    } = useObjectState<useReducerControllerProps<V>["initialTempValues"]>({
       initialValues: initialState as {
           [x: string]: any;
       } & useReducerControllerProps<V>["initialTempValues"]
    })

    return {
        values,
        tempValues,
        setTempValues,
        handleChangeTempValue,
        handleInitialTempValue,
        handleDispatch,
        getDispatchProps,
        handleInitialValues,
        dispatch
    }
}

export default useFormReducers;