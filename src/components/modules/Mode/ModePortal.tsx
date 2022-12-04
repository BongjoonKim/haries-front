import {ReactNode, ReactPortal, useEffect, useRef} from "react";
import {createPortal} from "react-dom";

const modeRoot = document.querySelector("#mode-root") as HTMLElement;

function ModePortal(props : { children : ReactNode }) : ReactPortal {
    const el = useRef(document.createElement("div"));

    useEffect(() => {
        const { current } = el;
        modeRoot?.appendChild(current);
        return () => void modeRoot?.removeChild(current);
    }, []);

    return createPortal(props.children, el.current);

}

export default ModePortal;