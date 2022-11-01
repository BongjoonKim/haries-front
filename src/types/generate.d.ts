type Generate<S, A, R = any> = (
    params : { schema : S; action : A },
    initialValue : R,
) => R;

type GenerateState<G extends Generate<any, any, any>> =
    G extends Generate<any, any, infer R> ? R : never[];

type GenerateAction<G extends Generate<any, any>> = G extends Generate<any, infer A> ? A : never;

type GenerateDispatch<A, R = any> = (value : A, initialValue : R) => R;

interface GenerateActionType<T, C = string, P = any> {
    type ?: T;
    class ?: C;
    payload ?: P;
}

type GenerateParams<S, T> = {
    schema : S;
    action : GenerateActionType<T>
};

type GenerateType<S> = Generate<S,  GenerateAction<Generate<S, any>>>;