import {ModeFrame} from "../../../../../types/mode";
import DialogContent from "./DialogContent";
import Mode from "../../index";
import MemoGeneralize from "../../../../renderers/MemoGeneralize";

function DialogItem<T = string, N = string>({
    type, name, id, title, status,
    onCloseMode, taskItems, onAddTaskItem,
    onRemoveTaskItem, onActiveSequenceMode,
    activeSequence, size, showTimeCount,
    construct, children, dependent, onCloseDependentMode,
    onVisibleStatus, isActiveEffect, onActiveEffect
}: ModeFrame.DialogProps<T, N>): JSX.Element {
    return (
        <Mode
            type={type}
            id={id}
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
            onVisibleStatus={onVisibleStatus}
            isActiveEffect={isActiveEffect}
            onActiveEffect={onActiveEffect}
        >
            {onVisibleStatus(name, id) && (
                <DialogContent<N>
                    name={name}
                    status={status}
                    construct={construct}
                    children={children}
                    onCloseDependentMode={onCloseDependentMode}
                    onVisibleStatus={onVisibleStatus}
                />
            )}
        </Mode>
    )
}

export default MemoGeneralize(DialogItem);