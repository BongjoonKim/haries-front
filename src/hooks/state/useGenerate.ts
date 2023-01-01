import {useState, useCallback, useMemo, useRef, startTransition} from "react";

function useGenerate<G extends Generate<any, any>>(
    generate: G,
    initialState: GenerateState<G>
) : [GenerateState<G>, GenerateDispatch<GenerateAction<G>>, boolean] {
  const nextGenerate = useMemo(() => generate, [generate]);
  const {current : nextInitialState} = useRef(initialState);
    const [state, setState] = useState<GenerateState<G>>(nextInitialState);
    const [isLoaded, setLoaded] = useState<boolean>(false);

    const handleSetState = useCallback((state: GenerateState<G>) => {
      startTransition(() => setState(state));
    }, []);
    const dispatch = useCallback(
        ({ schema, action}: GenerateAction<G>, initialValue: GenerateState<G>) => {
          const generate = nextGenerate({action, schema}, initialValue);
            setLoaded(true);
            const nextState = generate({action, schema}, initialValue);
            const closeLoading = () => setLoaded(false);
            Promise.resolve(generate).then(handleSetState).finally(closeLoading);
        }
        ,[handleSetState, isLoaded, nextGenerate]
    );
    return [state, dispatch, isLoaded];
}

export default useGenerate;