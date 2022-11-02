import {ModeComponent} from "../../../../types/mode";


function ModalBax<T, N>({
    type,
    status,
    name,
    title,
    size,
    onCloseMode,
    konAddTaskItem,
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
        showTiemCount,
        name,
        size
    });
}

export default ModalBax;