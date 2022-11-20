import {ChangeEvent} from "react";
import converter from "../../utilities/converter";
import {FormActionTypes} from "../../reducers/form.reducer";

interface useConnectDispatchProps<T, K, V> {
    dispatch: React.Dispatch<ReducerAction<T, any, K & any>>;
    values: V;
}

function useConnectDispatch<T, K ,V>(props: useConnectDispatchProps<T, K, V>) {
    const handleConnectChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target?.type) {
            const connectDispatchParams: ReducerDispatch<T, V, K> = {
                type: event.target.dataset.type as unknown as T,
                option: event.target.dataset.option
            };
            if (event.target.name) connectDispatchParams.name = String(event.target.name);
            if (event.target.value) connectDispatchParams.value = String(event.target.value) as unknown as V;
            props.dispatch(connectDispatchParams);
        }
    }

    const handleConnectChecked = (event : ChangeEvent<HTMLInputElement>) => {
        if (event.target.dataset?.type) {
            const dispatchParamerter: ReducerDispatch<T, V, K> = {
                type: event.target.dataset.type as unknown as T
            }

            const prevState = (props.values as V)[event.target.name as unknown as keyof V]
                ??
                converter.stringObjectKeysToValue<V, K>(
                    props.values,
                    String(event.target.name) as unknown as K
                );
            if (typeof prevState !== "undefined") {
                if  (event.target.name) dispatchParamerter.name = event.target.name;
                if (prevState.includes)
                    dispatchParamerter.value = prevState.includes(event.target.value.toString())
                        ? prevState.filter((x: string) => x !== event.target.value.toString())
                        : [...prevState, event.target.value.toString()];
                    dispatchParamerter.checked = event.target.checked;
                    props.dispatch(dispatchParamerter);
            }
        }
    };

    const handleDispatch = (parameter: ReducerDispatch<T, V, K>) => {
        const dispatchParameter: ReducerDispatch<T, V, K> = {type: parameter.type};
        if (parameter.name) dispatchParameter.name = parameter.name;
        if (parameter.value) dispatchParameter.value = parameter.value;
        if (typeof parameter.checked === "boolean") dispatchParameter.checked = parameter.checked;
        props.dispatch(dispatchParameter);
    }

    const handleInitialValues = (value?: V) => {
        const dispatchParameter = !value
            ? {type: FormActionTypes.INITIALIZE as unknown as T}
            : {type: FormActionTypes.REPLACE_GENERAL_VALUE as unknown as T, value}
        handleDispatch(dispatchParameter);
    }

    const getDispatchProps = (parameter: {
        name: K;
        type: T;
        mode ?: {checked?: boolean; widget?: boolean};
        value ?: unknown | "";
        option ?: string;
    }) => {
        const handler: {[x: string]: any} = {};
        if (parameter.mode?.widget) {
            handler.dispatch = props.dispatch;
        } else {
            handler.onChange = parameter?.mode?.checked ? handleConnectChecked : handleConnectChange;
        }
        let finalValue = (props.values as V)[parameter.name as unknown as keyof V]
        if (!parameter.value && String(parameter.name)?.includes(".")) {
            finalValue = converter.stringObjectKeysToValue<V, K>(props.values, parameter.name) || "";
        }

        return {
            actionType: parameter.type,
            actionOption: parameter.option,
            name: parameter.name as K,
            value: parameter.value || finalValue,
            ...handler
        };
    };

    return {
        getDispatchProps,
        handleDispatch,
        handleInitialValues,
    }
}

export default useConnectDispatch;