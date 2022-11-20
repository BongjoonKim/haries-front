import {DialogProcessType, ReturnValue, useDialogProcessFieldProps} from "./types";
import {useState} from "react";
import {FormActionTypes} from "../../../reducers/form.reducer";
import {MouseEvent} from "react";

function useDialogProcessField<T>(props: useDialogProcessFieldProps<T>) {
    const [dialogStatus, setDialogStatus] = useState<Modal.status>({
        id : "",
        options: {}
    });

    const handleChangeStatus = (parameter: Modal.status) => {
        setDialogStatus({
            id: parameter.id,
            options: parameter.options || {}
        })
    }

    const handleDispatch = (parameter: {
        name?: string;
        value?: ReturnValue;
        type?: FormActionTypes;
    }) => {
        props.dispatch?.({
            type: parameter.type || props.actionType,
            name: parameter.name || props.returnName || props.name,
            value: parameter.value
        })
    }

    const handleReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => () => {
        Promise.resolve(handleDispatch({name: props.name, value: ""}))
            .then(() => {
                if (props.returnName) {
                    const name = props.returnName;
                    const type = FormActionTypes.INITIAL_MULTI_VALUES;
                    props.dispatch?.({
                        name,
                        type
                    });
                }
            }).then(() => props.onAfterRequestOfRemove?.(event));
    }

    const handleSubmit = (value: ReturnValue) => {
        const name = props.returnName || props.name;
        let type;
        if (DialogProcessType.LIST_BOX !== props.type) {
            if (name.includes("=")) type = FormActionTypes.RETURN_CHANGE_SPECIFIED_OBJECT_VALUES;
            else if (name.includes(".")) type = FormActionTypes.CHANGE_OBJECT_VALUE;
            else type = FormActionTypes.REPLACE_ITEM_VALUE;
        } else {
            type = FormActionTypes.ADD_ARRAY_ITEM;
        }

        Promise.resolve(
            handleDispatch({name, type, value})
        ).then(() => handleChangeStatus({id: ""}));
        if (props.onCallback) props.onCallback(value);
    }

    const handleRemoveItem =
        (event: MouseEvent<HTMLButtonElement, MouseEvent>) => (index: number) => {
            Promise.resolve(
                handleDispatch({
                    type: FormActionTypes.REMOVE_ARRAY_ITEM,
                    name: `${props.name}.${index}`
                }),
            ).then(() => {
                props.setSelected(-1);
                props.onAfterRequestOfRemove?.(event)
            });
        }
    return {
        dialogStatus,
        handleSubmit,
        handleChangeStatus,
        handleDispatch,
        handleReset,
        handleRemoveItem
    }
}

export default useDialogProcessField;