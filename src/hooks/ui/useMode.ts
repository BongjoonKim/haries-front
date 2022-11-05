import {useState} from "react";
import converter from "../../utilities/converter";
import {dependentOptionsPath} from "../../components/modules/Mode";
import {ModeComponent} from "../../types/mode";

function useMode<N = string>() {
    const [status, setStatus] = useState<ModeComponent.ModeStatus<N>>({});
    const [taskItems, setTaskItems] = useState<ModeComponent.ModeTaskItems<N>>({});
    const [activeSequence, setActiveSequence] = useState<N[]>([]);

    const handleActiveSequenceMode = (name: N) => {
        setActiveSequence((prevState: N[]) => [name, ...prevState.filter((val:N) => val !== name)]);
    }

    const handleShowDependentMode = (name: N, content: ModeComponent.DependentContent) => {
        setStatus((prevState : ModeComponent.ModeStatus<N>) =>
            converter.changeDynamicObjectValue(
                prevState,
                [name, dependentOptionsPath, "global/DEPENDENT_MODE"].join("."),
                content
            )
        )
        return false;
    }

    const handleCloseDependentMode = (name: N) => {
        setStatus((prevState: ModeComponent.ModeStatus<N>) =>
            converter.objectRemoveKey(
                prevState,
                [name, dependentOptionsPath, "global/DEPENDENT_MODE"].join("."),
            )
        );
        return false;
    }

    const handleShowMode = (
        name: N,
        props?: Record<string, any>,
        options?: Record<string, ModeComponent.ModeStatusOptions>
    ) => {
        setStatus((prevState: ModeComponent.ModeStatus<N>) => ({
            ...prevState,
            [name as unknown as any] : {
                name,
                props,
                options : {
                    dependent: {},
                    ...options,
                    showTimeCount: Object.keys(status).length - 1
                }
            }
        }));
        handleActiveSequenceMode(name);
        return false;
    }

    const handleCloseMode = (name : N) => {
        const nextState = converter.objectRemoveKey(status, name as any);
        setStatus(nextState);
    }

    const handleAddTaskItem = ({name, title} : ModeComponent.ModeTaskItem<N>) => {
        setTaskItems((prevState: ModeComponent.ModeTaskItem<N>) => ({
            ...prevState,
            [name as unknown as any]: {name, title}
        }));
    }

    const handleRemoveTaskItem = (name: N) => {
        const nextState = converter.objectRemoveKey(taskItems, name as any);
        setTaskItems(nextState);
        setActiveSequence(prevState => prevState.filter(val => val !== name));
    }

    const handleCloseAllMode = () => setStatus({});

    const getModeProps = () => ({
        status,
        taskItems,
        activeSequence,
        onShowMode: handleShowMode,
        onCloseMode: handleCloseMode,
        onAddTaskItem: handleAddTaskItem,
        onRemoveTaskItem: handleRemoveTaskItem,
        onActiveSequenceMode: handleActiveSequenceMode,
        onShowDependentMode: handleShowDependentMode,
        onCloseDependentMode: handleCloseDependentMode,
        getModeRouterProps: getModeProps,
        getModeProps
    });

    return {
        status,
        taskItems,
        activeSequence,
        handleShowMode,
        handleCloseMode,
        handleCloseAllMode,
        handleAddTaskItem,
        handleRemoveTaskItem,
        handleShowDependentMode,
        handleCloseDependentMode,
        getModeProps
    }
}

export default useMode;