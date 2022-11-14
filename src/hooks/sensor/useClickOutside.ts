import {RefObject, useEffect} from "react";

function useClickOutside(
    ref: RefObject<HTMLInputElement | HTMLAreaElement>,
    callback: () => void
) {
    const handleClick = (e: MouseEvent) => {
        if (!ref?.current?.contains(e.target as HTMLDivElement)) {
            callback();
        }
    }

    useEffect(() => {
        globalThis.addEventListener("click", handleClick, true);
        return () => {
            globalThis.removeEventListener("click", handleClick, true)
        }
    })
}

export default useClickOutside;