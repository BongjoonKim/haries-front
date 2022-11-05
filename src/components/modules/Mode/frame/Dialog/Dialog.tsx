import {ModeFrame} from "../../../../../types/mode";
import DialogContent from "./DialogContent";
import Mode from "../../index";

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
            type={type}
            name={name}
            title={title}
            status={status}
            onCloseMode={onCloseMode}
            taskItems={taskItems}
            onAddTaskItem={onAddTaskItem}
            onRemoveTaskItem={onRemoveTaskItem}
            onActiveSequenceMode={onActiveSequenceMode}
            activeSequence={activeSequence}
            showTimeCount={showTimeCount}
            dependent={dependent}
            size={size}
        >
            {String(name) in status && (
                <DialogContent<N>
                    name={name}
                    status={status}
                    construct={construct}
                    children={children}
                    onCloseDependentMode={onCloseDependentMode}
                />
            )}
        </Mode>
    )
}