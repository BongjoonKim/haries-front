import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

const modalRoot = document.querySelector("#mode-root") as HTMLElement;

function ModePortal(props : { children : React.ReactNode }) : React.ReactPortal {
    const el = useRef(document.createElement("div"));

    useEffect(() => {
        const { current } = el;
        modalRoot?.appendChild(current);
        return () => void modalRoot?.removeChild(current);
    }, []);

    return createPortal(props.children, el.current);

}

export default ModePortal;