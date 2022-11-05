import {useState, useCallback} from "react";

function useGenerate<G extends Generate<any, any>>(
    generate: G,
    initialState: GenerateState<G>
) : [GenerateState<G>, GenerateDispatch<GenerateAction<G>>, boolean] {
    const [state, setState] = useState<GenerateState<G>>(initialState);
    const [isLoading, setLoading] = useState<boolean>(false);

    const dispatch = useCallback(
        ({ schema, action}: GenerateAction<G>, initialValue: GenerateState<G>) => {
            setLoading(true);
            const nextState = generate({action, schema}, initialValue);
            const closeLoading = () => setLoading(false);
            Promise.resolve(nextState).then(setState).finally(closeLoading);
        }
        ,[generate]
    );
    return [state, dispatch, isLoading];
}

export default useGenerate;