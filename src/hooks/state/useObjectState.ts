import {ChangeEvent, useEffect, useState} from "react";
import converter from "../../utilities/converter";

type Value = {[x: string]: string | ReadonlyArray<string> | boolean | number | any } | undefined;

interface useObjectStateProps<T> {
    initialValues?: T & Value;
    initialize?: any;
}

function useObjectState<T = Value>(props?: useObjectStateProps<T>) {
    const [values, setValues] = useState<Value>({});

    const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name, type, checked } = e.target;
        if (name) {
            setValues((prevState: Value) => {
                const finalValue = ["checkbox"].includes(type) ? checked : value;
                return !name.includes(".") ?
                    {...prevState, [name]: finalValue}
                    : converter.changeObjectValue<Value>(prevState, name, finalValue);
            })
        }
    }

    const handleChangeValue = (name: string, value: any & unknown) => {
        setValues(prevState => {
            if (name?.includes(".")) {
                return converter.changeObjectValue<Value>(prevState, name, value);
            }
            return {...prevState, [name]: value};
        })
    }

    const handleRemoveKey = (name: string) => {
        setValues(prevState => {
            return converter.removeObjectKey<any & T>(prevState, name);
        });
    }

    const handleInitialValue = (name: string) => {
        if (props?.initialValues)
            if (name?.includes(".")) {
                const finalValue = converter.stringObjectKeysToValue(props.initialValues, name);
                setValues(converter.changeObjectValue<Value>(props.initialValues, name, finalValue));
            } else {
                setValues(prevState => ({
                    ...prevState,
                    [name]: props.initialValues?.[name]
                }))
            }

    }

    useEffect(() => {
        if (props?.initialValues) setValues(props.initialValues)
    }, [props?.initialValues]);

    return {
        values,
        setValues,
        handleChangeEvent,
        handleChangeValue,
        handleRemoveKey,
        handleInitialValue
    }
}

export default useObjectState;