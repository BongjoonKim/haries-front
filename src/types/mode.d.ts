import {ComponentClass, FunctionComponent, JSXElementConstructor, ReactElement, ReactNode} from "react";
import {ModeTypes} from "../components/modules/Mode/router/generate";

declare namespace ModeComponent {
    type ModeStatusOptions = {
        dependentMap ?: Record<string, ModeComponent.DependentContent>;
        active ?: boolean;
        isMulti?: boolean;
        showTimeCount?: number;
        onCallbackCloseMode?: ModeComponent.onCallbackCloseMode;
        [x : string] : any;
    };

    type ModeStatus<N=string> = Record<N, ModeStatusItem<N>> | ModeStatusItem<N>[] | object;
    type ModeStatusItem<N=string> = {
        id?: string;
        name : N;
        props ?: Record<string, any>;
        options ?: ModeStatusOptions;
    };

    type ModeTaskItems<N=string> =
      | Record<N, ModeTaskItem<N>>
      | Record<N, ModeTaskItem<N>>[]
      | object;
    type ModeTaskItem<N=string> = {key:N | string; title : string}

    type BoxSize = {
        width?: number | string;
        height ?: number | string;
        minWidth ?: number | string;
        minHeight ?: number | string;
        maxWidth ?: number | string;
        maxHeight ?: number | string;
    };

    type onVisibleStatus<N = string> = (name: N, id?: string) => boolean;

    type onShowMode<N = string> = (
        name : N,
        props ?: Record<string, any>,
        options ?: Record<string, ModeStatusOptions>,
    ) => Record<PropertyKey, any>;

    type onCloseModeParameter<N = string> = (string & N) | {name: N; id?: string};

    type onCloseMode<N = string> = (
        parameter: onCloseModeParameter<N> | onCloseModeParameter<N>[]
    ) => Record<PropertyKey, any> | void | string;

    type onDependCloseMode = (name?: N & string, id?: string) => void;

    type onAddTaskItem<N = string> =({
        key,
        title,
    } : ModeComponent.ModeTaskItem<N>) => void;

    type onRemoveTaskItem<N = string> = (key:N | string) => void;
    type onActiveSequenceMode<N = string> = (key : N | string) => void;

    type onShowDependentMode<N = string> = (
        name : N,
        component : ModeComponent.DependentContent,
    ) => boolean | Record<PropertyKey, any>;

    type onCloseDependentMode<N = string> = (name:N) => void;

    type onActiveEffect<N = string> = (parameter: {active: boolean; name: N; id?: string}) => void;

    type onCallbackCloseMode = (
        ...args: any[]
    ) => Record<PropertyKey, any> | boolean | void | Promise<void>;

    type DependentContent = (...args : any[]) =>
        | JSX.Element
        |
        [
            (...args : any[]) => JSX.Element,
            Record<string, any> | undefined,
            ModeComponent.DependentContent | undefined,
        ];
    type handleCloseMode = () => void;

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
        id?: string;
        name : N;
        title ?: string;
        status : ModeComponent.ModeStatus<N>;
        onCloseMode ?:
            | ModeComponent.onCloseMode<N>
            | ModeComponent.onDependCloseMode<N>
            | ((name?: string) => void);
        onShowMode?: ModeComponent.onShowMode<N>;
        onShowDependentMode?: ModeComponent.onShowDependentMode<N>;
        taskItems ?: ModeTaskItems<N>;
        onAddTaskItem ?: onAddTaskItem<N>;
        onRemoveTaskItem ?: onRemoveTaskItem<N>;
        onActiveSequenceMode ?: onActiveSequenceMode<N>;
        activeSequence ?: (N | string)[];
        showTimeCount ?: number;
        size ?: ModeComponent.BoxSize;
        dependent ?: boolean;
        children : ReactNode;
        overlayClose?: boolean;
        onCallbackCloseMode?: ModeComponent.onCallbackCloseMode;
        onVisibleStatus: onVisibleStatus<N>;
        onActiveEffect?: onActiveEffect<N>;
        isActiveEffect?: boolean;
    }

    interface ModeBoxProps<T = string, N = string> {
        type : T;
        title ?: string;
        visibleStatus ?: boolean;
        onCloseMode : ModeComponent.handleCloseMode<N>;
        onAddTaskItem ?: ModeComponent.onAddTaskItem<N>;
        onActiveSequenceMode ?: onActiveSequenceMode<N>;
        taskItems ?: ModeTaskItems<N>;
        showTimeCount ?: number;
        children : ReactNode;
        size ?: ModeComponent.BoxSize;
        dependent ?: boolean;
        uniqueKey: N | string;
        isModeless: boolean;
        isActive: boolean;
    }

    interface ModeOverlayProps<T = string, N = string> {
        type : T;
        visibleStatus : boolean;
        onCloseMode : ModeComponent.handleCloseMode;
        overlayClose?: boolean;
    }

    interface getModeProps<N = string> {
        status: ModeComponent.ModeStatus<N>;
        taskItems: ModeComponent.ModeTaskItems<N>;
        activeSequence: string[];
        onShowMode: ModeComponent.onShowMode<N>;
        onCloseMode: ModeComponent.onCloseMode<N>;
        onAddTaskItem: ModeComponent.onAddTaskItem<N>;
        onRemoveTaskItem: ModeComponent.onRemoveTaskItem<N>;
        onActiveSequenceMode: ModeComponent.onActiveSequenceMode<N>;
        onShowDependentMode: ModeComponent.onShowDependentMode<string>;
        onVisibleStatus: ModeComponent.onVisibleStatus<N>;
        onActiveEffect?: onActiveEffect<N>;
        getModeProps?: getModeProps<N>;
        getModeRouterProps?: getModeProps<N>;
    }
}

declare namespace ModeFrame {
    interface DialogConstruct {
        title ?: string;
        aside ?: ReactElement<any, string | JSXElementConstructor<any>>;
        body ?: ReactElement<any, string | JSXElementConstructor<any>>;
        footer ?: ReactElement<any, string | JSXElementConstructor<any>>;
    }

    interface DialogProps<T = string, N = string> extends ModeComponent.ModeProps<T, N>, ModeComponent.ModeStatusOptions {
        dependent?: boolean;
        children : ReactElement;
        construct ?: DialogConstruct;
        onCloseDependentMode ?: ModeComponent.onCloseDependentMode<N>;
        isActiveEffect?: boolean;
        onCallbackCloseMode?: (active: boolean) => void;
    }

    interface DialogContent<N = string> {
        children ?: ReactElement;
        construct ?: DialogConstruct;
        onCloseDependentMode ?: ModeComponent.onCloseDependentMode<N>;
        name : N;
        status : ModeComponent.ModeStatus<N>;
        onVisibleStatus: ModeComponent.onVisibleStatus<N>;
    }

    interface DialogDependentMode<N> {
        onCloseDependentMode ?: ModeComponent.onCloseDependentMode<N>;
        name : N;
        status : ModeComponent.ModeStatus<N>;
        onVisibleStatus: ModeComponent.onVisibleStatus<any>
    }
}

declare namespace ModeRouterComponent {
    interface ModeRouterProps<N = string > {
        status : ModeComponent.ModeStatus<N>;
        onCloseMode : ModeComponent.onCloseMode<N>;
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
        onVisibleStatus: ModeComponent.onVisibleStatus<N>
    }

    interface ModeRouteProps {
        component : FunctionComponent | ComponentClass;
        title ?: string;
        name : any;
        type : any;
    }
}

declare namespace ModeContent {
    interface ModeExtendContentProps {
        mode ?: {
            type : string;
            status : ModeComponent.ModeStatus<N>;
            statusItem : ModeComponent.ModeStatusItem<N>;
            onCloseMode : (name?: N, id?: string) => void;
            onShowMode : ModeComponent.onShowMode<N>;
            action ?: { type : string };
        }
    }
}