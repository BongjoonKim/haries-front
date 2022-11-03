import {ModeComponent} from "../../../../types/mode";
import useModeBox from "./useModeBox";
import {animated} from "react-spring";

function ModalBax<T, N>({
    type,
    status,
    name,
    title,
    size,
    onCloseMode,
    onAddTaskItem,
    taskItems,
    showTimeCount,
    children,
    dependent,
} : ModeComponent.ModeBoxProps<T, N>) {
    const {
        boxRef,
        dragControlRef,
        minimize,
        setMinimize,
        boxSize,
        boxPosition,
        transitions,
        setResized,
        resized,
        maximize,
        onMaximize,
    } = useModeBox({
        status,
        showTimeCount,
        name,
        size
    });

    return transitions(
        ({ opacity }, item) =>
            item && (
                <animated.div
                    style={{
                        ...size,
                        opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1]})
                    }}
                    tabIndex={0}
                >

                </animated.div>
            )
    )
}

export default ModalBax;