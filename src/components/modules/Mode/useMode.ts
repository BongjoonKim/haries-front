import {ModeComponent, ModeContent, ModeFrame} from "../../../types/mode";
import {useEffect, useMemo} from "react";
import {ModeTypes} from "./router";

export interface useModeProps<T = string, N = string> {
    type: T;
    name: N;
    id?: string;
    onCloseMode?: ModeComponent.onCloseMode<N>;
    onActiveSequenceMode?: ModeComponent.onActiveSequenceMode<N>;
    activeSequence?: (N | string)[];
    onVisibleStatus: ModeComponent.onVisibleStatus<N>;
    onActiveEffect?: ModeComponent.onActiveEffect<N>;
    isActiveEffect?: boolean;
}

export interface ModeFrameProps<T = string, N = string> extends ModeFrame.DialogProps<T> {};

function useMode<T, N>({
    type,
    name,
    onCloseMode,
    onActiveSequenceMode,
    activeSequence,
    id,
    onVisibleStatus,
    isActiveEffect,
    onActiveEffect
}: useModeProps<T, N>) {
    const uniqueKey = useMemo(() => String(id || name), [name, id]);
    const visibleStatus = useMemo(() => onVisibleStatus(name, id), [onVisibleStatus, name, id]);
    const activeSequenceIndex = useMemo(() => {
        const initialActiveIndex: number = String(type)?.includes(ModeTypes.MODAL) ? 9998: 9898;
        const nextActiveSequence = activeSequence as string[];
        if (nextActiveSequence?.includes(uniqueKey))
            return initialActiveIndex - (nextActiveSequence?.indexOf(uniqueKey) || 0);
        return initialActiveIndex;
    },[uniqueKey, activeSequence, type]);
    const handleCloseMode = () => {
        onCloseMode?.({name, id});
    };
    const handleActiveSequenceMode = (key: N | string) => {
        if (String(type)?.includes(ModeTypes.MODELESS) && activeSequence?.indexOf(key) !== 0) {
            onActiveSequenceMode?.(key);
        }
    };
    useEffect(() => {
        if (typeof isActiveEffect === "boolean") onActiveEffect?.({active: isActiveEffect, name, id});
    },[id, isActiveEffect, name, onActiveEffect]);

    return {
        uniqueKey,
        activeSequenceIndex,
        visibleStatus,
        handleCloseMode,
        handleActiveSequenceMode
    }
};

export default useMode;