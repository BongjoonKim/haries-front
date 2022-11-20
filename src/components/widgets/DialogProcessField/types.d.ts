import {message} from "../../../types/form";
import {currentStatus} from "../../../constants/types/status.const";
import React, {Dispatch, SetStateAction} from "react";

export enum DialogProcessType {
    List_BOX = "DialogProcess/LIST_BOX",
    TEXT_BOX = "DialogProcess/TEXT_BOX"
}

export type ConnectContent =
    | ((...args: any[]) => JSX.Element)
    | [(...args: any[]) => JSX.Element, Record<string, any>];

export type ReturnValue = Record<string, any> | string;

export interface DialogProcessFieldProps<T> extends DispatchProps {
    status: Modal.status;
    onChangeStatus: (parameter: Modal.status) => void;
    onBeforeRequestOfDialog?: (...args: any[]) => void | Promise<void>;
    onAfterRequestOfRemove?: (...args: any[]) => void | Promise<void>;
    onSubmit: (value: ReturnValue) => void | Promise<void>;
    ConnectContent: ConnectContent;
    returnName ?: string;
    onCallback ?: (values: ReturnValue) => unknown;
    type ?: DialogProcessType;
    resetReturnName?: string;
    size?: Modal.boxSize;
    message?: message<currentStatus>;
    messageStatus?: currentStatus;
    disabled?: {
        textInput?: boolean;
        button?: [boolean, boolean];
    }
}

export interface useDialogProcessFieldProps<T> extends DialogProcessFieldProps<T> {
    setSelected: Dispatch<SetStateAction<number>>;
}

export interface ItemsProps {
    value: Record<string, any>;
    dispatch?: React.Dispatch<ReducerAction>
}

export interface DialogProcessListProps extends ItemsProps {
    onListKeyDown: (event : KeyboardEvent<HTMLUListElement | HTMLButtonElement>) => void;
    onKeyDown: (index: number) => (event: KeyboardEvent<HTMLLIElement>) => void;
    setSelectedThenCloseDropdown: (index: number) => void;
    isOptionsOpen: boolean;
    setIsOptionsOpen: boolean;
    selected: number;
    setSelected: Dispatch<SetStateAction<number>>;
}

export interface DialogProcessFieldDialog {
    status: Modal.status;
    value?: string;
    onChangeStatus: (parameter: Modal.status) => void;
    onSubmit: (value: string) => void;
    ConnectContent: ConnectContent;
}