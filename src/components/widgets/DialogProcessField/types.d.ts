import {message} from "../../../types/form";
import {currentStatus} from "../../../constants/types/status.const";
import React, {ChangeEvent, Dispatch, ReactNode, SetStateAction} from "react";
import {ModeComponent} from "../../../types/mode";

export enum DialogProcessBaseKey {
    HANDLER = "dialog-process-handler"
}

export enum DialogProcessType {
    LIST_BOX = "DialogProcess/LIST_BOX",
    TEXT_BOX = "DialogProcess/TEXT_BOX",
    COMBO_BOX = "DialogProcess/COMBO_BOX"
}

export enum DialogProcessModeType {
    DIALOG_PROCESS_FIELD = "DialogProcess/Dialog_Process_Field"
}

export enum DialogProcessViewType {
    MODAL = "DialogProcessShowType/MODAL",
    MODELESS = "DialogProcessShowType/MODELESS",
    POPOVER = "DialogProcessShowType/POPOVER"
}

export enum DialogProcessHandlerType {
    EXTEND = "DialogProcessHandler/Extend",
    REMOVE = "DialogProcessHandler/REMOVE"
}

export enum DialogProcessHandlerIconType {
    SEARCH = "DialogProcessHandlerIconType/Search",
    CREATE = "DialogProcessHandlerIconType",
    REMOVE = "DialogProcessHandlerIconType",
    MINUS = "DialogProcessHandlerIconType",
    PLUS = "DialogProcessHandlerIconType",
}

export declare namespace DialogProcessCommon {
    type onSubmit<V = ReturnValue> = (parameter?: {
        flag?: string;
        mode?: boolean;
    }) => (value: V) => void | Promis<void>;

    type onReSubmit<V = ReturnValue> = (value: V) => void | Promis<void>;
    type onReset = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => () => void;
    type onRemoveItem = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => (index: number) => void;
    type InputValue = Record<string, any> | string;
    type ReturnValue = Record<string, any> | string;

    type DisabledMap ={
        baseField?: boolean;
        textInput?: boolean;
        button?: boolean[];
        handlers?: boolean[];
    }
}

export declare namespace DialogProcessViews {
    type HandlerDisplay = {label?: string; icon?: DialogProcessHandlerIconType};
    type HandlerAction = {
        type?: DialogProcessViewType;
        component: ContentItem;
        options?: {size?: ModeComponent.BoxSize; title?: string};
    };

    type ContentItem =
        | ((...args: any[]) => JSX.Element)
        | [(...args: any[]) => JSX.Element, Record<string, any>];

    type ContentMap = {
        display?: HandlerDisplay;
        action: HandlerAction;
        disabled?: boolean;
    }

    interface HandlerProps {
        onReset: DialogProcessCommon.onReset;
        onRemoveItem: DialogProcessCommon.onRemoveItem;
        type: DialogProcessType;
        selected: any;
        onShowMode: ModeComponent.onShowMode;
        contentMaps?: ContentMap[];
        onSubmit: DialogProcessCommon.onSubmit;
        value: DialogProcessCommon.InputValue;
        disabledSet?: boolean[];
    }

    interface HandlerButton {
        children: ReactNode;
        onClick: ((...args: any[]) => void) | ((...args: any[]) => (...args: any[]) => void);
    }

    interface ModeContainerProps {
        value?: DialogProcessCommon.InputValue;
        onSubmit: DialogProcessCommon.onSubmit;
        getModeProps: () => ModeComponent.getModeProps;
        onCloseMode: ModeComponent.onCloseMode;
        contentMaps?: ContentMap[];
        ConnectContent?: ContentItem;
        size?: ModeComponent.BoxSize;
    }

    interface ModeItemProps {
        value?: DialogProcessCommon.InputValue;
        name: string;
        type: string;
        content: ContentItem;
        onSubmit: DialogProcessCommon.onReSubmit;
        onClose: () => void;
        getModeProps: () => ModeComponent.getModeProps;
        size?: ModeComponent.BoxSize;
        title?: string;
    }

    interface ModeHandlerProps {
        children: ReactNode;
        onClick: (...args: any[]) => void;
        disabled?: boolean;
    }
}

export declare namespace DialogProcessItems {
    interface useDialogProcessListProps {
        value: Record<string, any>;
        dispatch?: React.Dispatch<ReducerAction>;
        type: DialogProcessType;
    }

    interface DialogProcessTextProps {
        actionType: string;
        value: string | number;
        name: string;
        onChange: (event : ChangeEvent<HTMLInputElement>) => void;
    }

    interface DialogProcessListBoxProps {
        value: Record<string, any>;
        dispatch?: Dispatch<ReducerAction>;
        onListKeyDown: (event: KeyboardEvent<HTMLUListElement | HTMLButtonElement>) => void;
        onKeyDown: (index : number) => (event: KeyboardEvent<HTMLLIElement>) => void;
        setSelectedThenCloseDropdown: (index: number) => void;
        isOptionsOpen: boolean;
        setIsOptionsOpen: Dispatch<SetStateAction<boolean>>;
        selected: number;
        setSelected: Dispatch<SetStateAction<number>>;
    }

    interface DialogProcessComboBoxProps {
        options: Array<{
            id?: string | number;
            label: string;
            value: string | number;
        }>
    }
}

export declare namespace DialogProcessField {
    interface MainProps<V> extends DispatchProps {
        onBeforeRequestOfDialog?: (...args: any[]) => void | Promise<void>;
        onAfterRequestOfRemove?: (...args: any[]) => void | Promise<void>;
        returnName?: string;
        onCallback?: (values: V | DialogProcessCommon.ReturnValue) => unknown;
        type?: DialogProcessType;
        options?: DialogProcessItems.DialogProcessComboBoxProps["options"];
        message?: message<currentStatus>;
        messageStatus?: currentStatus;
        size?: ModeComponent.BoxSize;
        disabled?: DialogProcessCommon.DisabledMap;
    }

    interface ContentMapProps<V> extends MainProps<V> {
        contentMaps: DialogProcessViews.ContentMap[];
        ConnectContent?: DialogProcessViews.ContentItem;
    }

    interface ContentItemProps<V> extends MainProps<V> {
        ConnectContent: DialogProcessViews.ContentItem;
        contentMaps?: DialogProcessViews.ContentMap[];

    }
}