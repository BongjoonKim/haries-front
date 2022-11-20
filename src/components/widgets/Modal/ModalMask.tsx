import {useTransition, animated} from "react-spring";

function ModalMask(props: {
    id: string | number;
    statusId: string | number;
    onchangeStatus?: Modal.onChangeStatus;
}) {
    const transtion = useTransition(props.statusId === props.id, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
    });

    return transtion(
        ({opacity}, item) => item && (
            <animated.div
                style={{
                    opacity: opacity.to({range:[0.0, 1.0], output:[0,1] })
                }}
            >
                <div
                    className="modal-mask"
                    onClick={() => props.onchangeStatus?.({id: ""})}
                    role="button"
                    tabIndex={0}
                />
            </animated.div>

        )
    )
}

export default ModalMask;