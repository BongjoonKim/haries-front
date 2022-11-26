import {DialogProcessCommon, DialogProcessField, DialogProcessModeType, DialogProcessType} from "./types";
import {ChangeEvent, MouseEvent} from "react";
import {FormActionTypes} from "../../../reducers/form.reducer";
import useMode from "../../../hooks/ui/useMode";
import {useDialogProcessList} from "./items";
import ReturnValue = DialogProcessCommon.ReturnValue;
import generatorUtil from "../../../utilities/generatorUtil";

function useDialogProcessField<T>(props: DialogProcessField.MainProps<T>) {
    const {getModeProps, handleShowMode, handleCloseMode} = useMode();
    const {getDialogProcessListProps, selected, setSelected} = useDialogProcessList({
        type: props.type || DialogProcessType.LIST_BOX,
        value: props.value,
        dispatch: props.dispatch
    });

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

    const handleReset = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => () => {
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

    const getBranchType = (name: string) => {
        switch (props.type) {
            case DialogProcessType.LIST_BOX:
                return FormActionTypes.ADD_ARRAY_ITEM;
            default:
                if (name.includes("=")) return FormActionTypes.RETURN_CHANGE_SPECIFIED_OBJECT_VALUES;
                else if (name.includes(".")) return FormActionTypes.CHANGE_OBJECT_VALUE;
                else return FormActionTypes.REPLACE_ITEM_VALUE;
        }
    }

    const handleAfterCloseMode = (parameter?: {flag?: string; mode?: boolean}) => {
        if (parameter?.mode !== false) {
            handleCloseMode(
                !parameter?.flag
                    ? DialogProcessModeType.DIALOG_PROCESS_FIELD
                    : generatorUtil.flagWithID(DialogProcessModeType.DIALOG_PROCESS_FIELD, String(parameter?.flag))
            )
        }
    }

    const handleSubmit = (parameter?: {flag?: string; mode?: boolean}) => (value: ReturnValue) => {
        const name = props.returnName || props.name;

        Promise.resolve(
            handleDispatch({name, type: getBranchType(name), value})
        ).then(() => handleAfterCloseMode({flag: parameter?.flag, mode: parameter?.mode}));
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
                setSelected(-1);
                props.onAfterRequestOfRemove?.(event)
            });
    }

    const getDialogProcessTextProps = () => ({
        actionType: props.actionType,
        value: props.value || "",
        name: props.name,
        disabled: props.disabled?.baseField || props.disabled?.textInput,
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
            handleDispatch({
                name: props.name,
                value: String(event.target.value)
            })
    });

    return {
        handleSubmit,
        handleReset,
        handleRemoveItem,
        getDialogProcessTextProps,
        getDialogProcessListProps,
        getModeProps,
        handleShowMode,
        handleCloseMode,
        selected,
        setSelected
    }
}

export default useDialogProcessField;