import {RefObject, useEffect, useMemo} from "react";

function useClickOutside(
    ref: RefObject<HTMLInputElement | HTMLAreaElement>,
    callback: () => void,
    prevent?: boolean
) {
    const preventFlag = useMemo(() => (prevent !== undefined ? prevent : false), [prevent]);
    const handleClick = (e: MouseEvent) => {
        if (!preventFlag && !ref?.current?.contains(e.target as HTMLDivElement)) {
            callback();
        }
    }

    useEffect(() => {
        if (!preventFlag) globalThis.addEventListener("click", handleClick, true);
        return () => {
            if (!preventFlag) globalThis.removeEventListener("click", handleClick, true)
        }
    })
}

export default useClickOutside;