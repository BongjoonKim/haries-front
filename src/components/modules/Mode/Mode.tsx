import {ModeComponent, ModeContent} from "../../../types/mode";
import {useMemo} from "react";
import {ModeTypes} from "./router/generate";

function Mode<T, N>({
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
    children,
    dependent,
} : ModeComponent.ModeProps<T, N>) {
    const activeIndex = useMemo(() => {
        const initialActiveIndex : number = String(type)?.includes(ModeTypes.MODAL)
            ? 9998
            : 9899
        if (activeSequence?.includes(name))
            return initialActiveIndex - (activeSequence?.indexOf(name) || 0);
        return initialActiveIndex;
    }, [activeSequence, name, type]);
}