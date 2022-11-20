import {CSSProperties, MouseEventHandler, ReactNode} from "react";
import {useTransition, animated} from "react-spring";
import {VscChromeClose} from "react-icons/vsc";

function ModalBox(props : {
    id: string | number;
    statusId: string | number;
    onCloseModal?: MouseEventHandler;
    onCLoseCallback?: () => void;
    children: ReactNode;
    size?: Modal.boxSize;
    closeStyle?: CSSProperties
}) {
    const transtion = useTransition(props.statusId === props.id, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
    });

    return transtion(
        ({opacity}, item) => item && (
            <animated.div
                className="modal-area"
                style={{
                    ...props.size,
                    opacity: opacity.to({range:[0.0, 1.0], output:[0,1]})
                }}
            >
                {props.onCloseModal && (
                    <VscChromeClose
                        size="25px"
                        color="#fff"
                        className="modal-close-button"
                        onClick={event => {
                            props.onCloseModal?.(event);
                            props.onCLoseCallback?.()
                        }}
                    />
                )}
                {props.children}
            </animated.div>
        )
    )
}

export default ModalBox;