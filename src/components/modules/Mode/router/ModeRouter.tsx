import {ModeRouterComponent} from "../../../../types/mode";
import useModeRouter from "./useModeRouter";
import ModePortal from "../ModePortal";

function ModeRouter<T, N>({
    status,
    onCloseMode,
    onShowMode,
    children,
    taskItems,
    onAddTaskItem,
    onRemoveTaskItem,
    onActiveSequenceMode,
    activeSequence,
    onShowDependentMode,
    onCloseDependentMode
}: ModeRouterComponent.ModeRouterProps<N>) {
    const {modes} = useModeRouter<T, N>({
        schema: children,
        action: {
            payload: {
                status,
                onCloseMode,
                onShowMode,
                taskItems,
                onAddTaskItem,
                onRemoveTaskItem,
                onActiveSequenceMode,
                activeSequence,
                onShowDependentMode,
                onCloseDependentMode

            }
        }
    });
    return <ModePortal>{modes}</ModePortal>;
}

export default ModeRouter;