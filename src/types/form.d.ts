import React, {ChangeEvent, InputHTMLAttributes} from "react";
import {FORMERR} from "dns";

interface SelectedFile {
    readonly lastModified: number;
    readonly lastModifiedDate: Date | "";
    readonly name: string;
    readonly size?: number;
    readonly type?: string;
    readonly webkitRelativePath: string;
}

type SelectProps<T = Select.selected> = {
    defaultValue: any;
    value: any;
    onChange: (newValue: T, actionMeta?: any) => void;
    options?: any;
    getOptions:
        | {
        label: string;
        value: string;
        }
        | undefined;
    name: string | undefined
}

type getSelectProps<T = Select.selected> = () => SelectProps<T>

type InputProps = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    name: string | undefined;
}

type getInputProps = () => InputProps;

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    name: string | undefined;
    checked?: boolean;
    id?: string;
    label?: string;
    message?: string;
    onReset?: () => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
    status?: currentStatus;
    filter?: RegExp;
}

type FormErrors<V> = {
    [x in FormHandlerType] : FormError<V>;
}

type FormError<V, T = string> =
    | {
    [x in keyof V]: string | { text: string; type: T };
    }
    | object;

type message<T = string> = string | {text: string; type: T};

interface ClauseTableContextState<T, V, F = any> {
    getDispatchProps?: getDispatchProps<T, keyof V>;
    dispatch: React.Dispatch<ReducerAction<T, any, keyof V>>;
    values: V;
    handleDispatch: ConnectDispatch<T, keyof V>["handler"];
    errors?: FormError<F>;
    [x: string]: any;
}

