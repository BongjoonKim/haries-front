type ReducerValue<T extends Record<any, PropertyKey>, NewValue> =
    | Record<T[keyof T], NewValue>
    | NewValue;

interface ReducerAction<T = string, V = any, K = string> {
    readonly type: T;
    readonly value?: V;
    readonly name?: K;
    readonly checked?: boolean;
    readonly payload ?: V;
    readonly options ?: string;
    readonly error?: boolean;
}

interface ReducerDispatch<T = string, V = any, K = string> {
    type: T;
    value?: V;
    name?: K | string;
    payload?: V;
    checked?: boolean;
    option?: string;
}

interface ConnectDispatch<T, K> {
    handler: (params: ReducerDispatch<T, any, K>) => void;
}

type DispatchProps<T = string, K = string> = {
    actionType: T;
    name: K;
    value: any;
    checked?: boolean;
    actionOptions?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    dispatch?: React.Dispatch<ReducerAction<T, any, K>>;
}

type getDispatchProps<T = string, K = string> = (parameters: {
    name: K;
    type: T;
    options?: string;
    mode?: {checked?: booleand; widget?: boolean};
}) => DispatchProps<T, K>;