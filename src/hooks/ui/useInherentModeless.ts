import {useCallback, useState} from "react";
import {ModeComponent} from "../../types/mode";
import converter from "../../utilities/converter";

function useInherentModeless<T = string>() {
    const [taskItems, setTaskItems] = useState<ModeComponent.ModeTaskItems<T | string>>({});
    const [activeSequence, setActiveSequence] = useState<(T | string)[]>([]);

    const handleClearAllModeless = useCallback(() => {
        setTaskItems({});
        setActiveSequence([]);
    },[]);

    const handleAddTaskItem = useCallback(({key, title}: ModeComponent.ModeTaskItem<T>) => {
        if (!taskItems[key as keyof ModeComponent.ModeTaskItems<T>]) {
            setTaskItems((prevState: ModeComponent.ModeTaskItem<T>) => ({
                ...prevState,
                [key as keyof T]: {key, title}
            }));
        }
    },[taskItems]);

    const handleRemoveTaskItem = useCallback((key: T | string) => {
        if (taskItems[key as keyof ModeComponent.ModeTaskItems<T>]) {
            const nextState = converter.objectRemoveKey(taskItems, key as keyof T | string);
            setTaskItems(nextState);
            setActiveSequence(prevState => prevState.filter(value => value !== key));
        }
    },[taskItems]);

    const handleActiveSequenceMode = useCallback((key: T | string) => {
        setActiveSequence((prevState: (string | T)[]) => [
            key,
            ...prevState.filter((value: string | T) => value !== key)
        ])
    },[setActiveSequence]);

    const handleRemoveSequenceMode = useCallback(
        (key: T | string) => {
            if (activeSequence.includes(key)) {
                setActiveSequence((prevState: (string | T)[]) =>
                prevState.filter((value: string | T) => value !== key));
            }
        },[activeSequence]);

    return {
        taskItems,
        activeSequence,
        handleClearAllModeless,
        handleAddTaskItem,
        handleRemoveSequenceMode,
        handleRemoveTaskItem,
        handleActiveSequenceMode

    }

}

export default useInherentModeless;