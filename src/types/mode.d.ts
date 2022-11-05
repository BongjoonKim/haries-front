import {ComponentClass, FunctionComponent, JSXElementConstructor, ReactElement} from "react";
import {ModeTypes} from "../components/modules/Mode/router/generate";

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
        onCloseMode : ModeComponent.onCloseMode<N>;
        taskItems ?: ModeTaskItems<N>;
        onAddTaskItem ?: onAddTaskItem<N>;
        onRemoveTaskItem ?: onRemoveTaskItem<N>;
        onActiveSequenceMode ?: onActiveSequenceMode<N>;
        activeSequence ?: N[];
        showTimeCount ?: number;
        size ?: ModeComponent.BoxSize;
        dependent ?: boolean;
        children : React.ReactNode;
    }

    interface ModeBoxProps<T = string, N = string> {
        type : T;
        name : N;
        title ?: string;
        status : ModeComponent.ModeStatus<N>;
        onCloseMode : ModeComponent.handleCloseMode;
        onAddTaskItem ?: ModeComponent.onAddTaskItem<N>;
        onActiveSequenceMode ?: onActiveSequenceMode<N>;
        taskItems ?: ModeTaskItems<N>;
        showTimeCount ?: number;
        children : React.ReactNode;
        size ?: ModeComponent.BoxSize;
        dependent ?: boolean;
    }

    interface ModeOverlayProps<T = string, N = string> {
        type : T;
        name : N;
        status : ModeComponent.ModeStatus<N>;
        onCloseMode : ModeComponent.handleCloseMode;
    }
}

declare namespace ModeFrame {
    interface DialogConstruct {
        title ?: string;
        aside ?: ReactElement<any, string | JSXElementConstructor<any>>;
        body ?: ReactElement<any, string | JSXElementConstructor<any>>;
        footer ?: ReactElement<any, string | JSXElementConstructor<any>>;
    }

    interface DialogProps<T = string, N = string> extends ModeComponent.ModeProps<T, N> {
        showTimeCount ?: number;
        children ?: ReactElement<any, string | JSXElementConstructor<any>>;
        construct ?: DialogConstruct;
        onCloseDependentMode ?: ModeComponent.onCloseDependentMode<N>;
    }

    interface DialogContent<N> {
        children ?: ReactElement<any, string | JSXElementConstructor<any>>;
        construct ?: DialogConstruct;
        onCloseDependentMode ?: ModeComponent.onCloseDependentMode<N>;
        name : N;
        status : ModeComponent.ModeStatus<N>;
    }

    interface DialogDependentMode<N> {
        onCloseDependentMode ?: ModeComponent.onCloseDependentMode<N>;
        name : N;
        status : ModeComponent.ModeStatus<N>;
    }
}

declare namespace ModeRouterComponent {
    interface ModeRouterProps<N = string > {
        status : ModeComponent.ModeStatus<N>;
        onCloseMode : (name : N) => void;
        onShowMode : ModeComponent.onShowMode<N>;
        taskItems ?: ModeComponent.ModeTaskItems<N>;
        onAddTaskItem ?: ModeComponent.onAddTaskItem<N>;
        onRemoveTaskItem ?: ModeComponent.onRemoveTaskItem<N>;
        onActiveSequenceMode ?: ModeComponent.onActiveSequenceMode<N>;
        onShowDependentMode ?: ModeComponent.onShowDependentMode<N>;
        onCloseDependentMode ?: ModeComponent.onCloseDependentMode<N>;
        activeSequence ?: N[];
        action ?: {type : string};
        children : JSX.Element[];
    }

    interface ModeRouteProps<T = ModeTypes, N = string> {
        component : any;
        title ?: string;
        name : N;
        type : T;
    }
}

declare namespace ModeContent {
    interface ModeExtendContentProps {
        mode ?: {
            type : string;
            status : ModeComponent.ModeStatus<N>;
            statusItem : ModeComponent.ModeStatusItem<N>;
            onCloseMode : (name?: N) => void;
            onShowMode : ModeComponent.onShowMode<N>;
            action ?: { type : string };
        }
    }
}