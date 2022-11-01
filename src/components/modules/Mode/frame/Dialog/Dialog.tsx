import {ModeFrame} from "../../../../../types/mode";

export default function Dialog<T = string, N = string>({
    type,
    name,
    title,
    status,
    onCloseMode,
    taskItems,
    onAddTaskItem,
    onRemoveTaskItem,
    onActiveSequenceMode,
    activeSequence,
    size,
    showTimeCount,
    construct,
    children,
    dependent,
    onCloseDependentMode
} : ModeFrame.DialogProps<T, N>) : JSX.Element {
    return (
        <Mode
    )
}