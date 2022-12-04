import generate, {Schema, ModeTypes} from "./generate";
import useGenerate from "../../../../hooks/state/useGenerate";
import {useCallback, useLayoutEffect} from "react";

function useModeRouter<T, N>({
    schema,
    action
}: GenerateParams<Schema, ModeTypes>) {
    const [modes, dispatch, isLoading] = useGenerate<GenerateType<Schema>>((generate<T, N>), []);

    const getDynamicGenerate = useCallback(() => {
        dispatch({schema, action}, []);
    },[dispatch, schema, action])

    useLayoutEffect(() => {
        getDynamicGenerate();
    }, [schema, action?.payload?.status, action?.payload?.activeSequence]);

    return {
        modes,
        isLoading
    };
}

export default useModeRouter;