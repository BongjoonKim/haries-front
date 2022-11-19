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