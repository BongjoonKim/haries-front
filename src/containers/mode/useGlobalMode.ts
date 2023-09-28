import {useEffect} from "react";
import useMode from "../../hooks/ui/useMode";
function useGlobalMode<N>() {
    const {status, taskItems, activeSequence, handleShowMode, getModeProps} = useMode<N>();

    // useEffect(() => console.log("modalStatus", status), [status]);
    // useEffect(() => console.log("modal-taskItems", taskItems), [taskItems]);
    // useEffect(() => console.log("modal-activeSequence", activeSequence), [activeSequence]);

    return {
        handleShowMode,
        getGlobalModeProps: getModeProps
    }
}

export default useGlobalMode;