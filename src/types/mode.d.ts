declare namespace ModeComponent {
    type ModeStatusOptions = {
        dependent ?: Record<string, ModeComponent.DependentContent>;
        active ?: boolean;
        [x : string] : any;
    };

    type ModeStatus<N=string> = Record<N, ModeStatusItem<N>> | object;
    type ModeStatusItem<N=string> = {
        name : N;
        props ?: Record<string, any>;
        options ?: Record<string, ModeStatusOptions>;
    };

    type ModeTaskItems<N=string> = Record<N, ModeTaskItem<N>> | object;
    type ModeTaskItem<N=string> = {name:N; title : string}

    type BoxSize = {
        width?: number | string;
        height ?: number | string;
        minWidth ?: number | string;
        minHeight ?: number | string;
        maxWidth ?: number | string;
        maxHeight ?: number | string;
    };

    type onShowMode<N = string> = (
        name : N,
        props ?: Record<string, any>,
        options ?: Record<string, ModeStatusOptions>,
    ) => void;

    type onCloseMode<N = string> = (name:N) => void;
    type handleCloseMode = () => void;

    type onAddTaskItem<N = string> =({
        name,
        title,
    } : ModeComponent.ModeTaskItem<N>) => void;

    type onRemoveTaskItem<N = string> = (name:N) => void;
    type onActiveSequenceMode<N = string> = (name : N) => void;

    type onShowDependentMode<N = string> = (
        name : N,
        component : ModeComponent.DependentContent,
    ) => void;

    type onCloseDependentMode<N=string> = (name:N) => void;

    type DependentContent = (...args : any[]) => | JSX.Element |
        [
            (...args : any[]) => JSX.Element,
            Record<string, any> | undefined,
            ModeComponent.DependentContent | undefined,
        ];

    interface ModeContextValue<N = string> {
        status : ModeComponent.ModeStatus<N>;
        taskItems : ModeComponent.ModeTaskItems<N>;
        activeSequence : N[];
        onShowMode : onShowMode<N>;
        onOpenMode ?: onShowMode<N>;
        onCloseMode : onCloseMode<N>;
        onAddTaskItem : onAddTaskItem<N>;
        onRemoveTaskItem : onRemoveTaskItem<N>;
        onActiveSequenceMode : onActiveSequenceMode<N>;
        onShowDependentMode : onShowDependentMode<N>;
        onCloseDependentMode : onCloseDependentMode<N>;
        getModeRouterProps : () => ModeContextValue<N>;
        getModeProps : () => ModeContextValue<N>;
    }

    interface ModeProps<T = string, N = string> {
        type : T;
        name : N;
        title ?: string;
        status : ModeComponent.ModeStatus<N>;
        onCLoseMode : ModeComponent.onCloseMode<N>;
        taskItems ?: ModeTaskItems<N>;
        onAddTaskItem ?: onAddTaskItem<N>;
        onRemoveTaskItem : onRemoveTaskItem<N>;
        onActiveSequenceMode : onActiveSequenceMode<N>;
        activeSequence ?: N[];
        showTimeCount ?: number;
        size ?: ModeComponent.BoxSize;
        dependent ?: boolean;
        children : React.ReactNode;
    }
}