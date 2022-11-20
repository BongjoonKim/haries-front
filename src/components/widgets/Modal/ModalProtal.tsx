import {createPortal} from "react-dom";
import {ReactNode, ReactPortal, useEffect, useRef} from "react";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

function ModalPortal(props: {children: ReactNode}): ReactPortal{
    const element = useRef(document.createElement("div"));

    useEffect(() => {
        const {current} = element;

        modalRoot?.appendChild(current);
        return () => void modalRoot?.removeChild(current)
    }, []);

    return createPortal(props.children, element.current);
}

export default ModalPortal;