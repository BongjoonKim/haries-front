import {MutableRefObject, useEffect, useRef} from "react";

function usePrevious<T>(value?: T): T | undefined {
    const ref: MutableRefObject<T | undefined> = useRef<T>();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export default usePrevious;