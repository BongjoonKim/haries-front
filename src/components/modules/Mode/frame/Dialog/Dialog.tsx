import {ModeComponent, ModeFrame} from "../../../../../types/mode";
import DialogContent from "./DialogContent";
import Mode, {ModeTypes} from "../../index";
import {ModeFrameProps} from "../../useMode";
import {cloneElement, Fragment, isValidElement} from "react";
import DialogItem from "./DialogItem";
import MemoGeneralize from "../../../../renderers/MemoGeneralize";

function Dialog<T = string, N = string>({
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
    construct,
    children,
    dependent,
    onCloseDependentMode,
    onVisibleStatus,
    onShowMode,
    onShowDependentMode,
    isActiveEffect,
    onActiveEffect
} : ModeFrameProps<T, N>) {
    const commonProps = {
        dialog : {
            type, name, title, status, onCloseMode,
            taskItems, onAddTaskItem, onRemoveTaskItem,
            onActiveSequenceMode, activeSequence,
            size, construct, dependent, onCloseDependentMode,
            onVisibleStatus, isActiveEffect, onActiveEffect
        },
        component: {
            mode: children?.props?.mode || {
                type, name, status,
                statusItem : status[name as keyof ModeComponent.ModeStatus<N>],
                onCloseMode: (name?: N, id?: string) => onCloseMode((typeof name === "string" && name) || name, id),
                onCloseDependentMode,
                onShowMode,
                onShowDependentMode
            }
        }
    }
    if (String(type)?.includes(ModeTypes.MODELESS) && Array.isArray(status[name as keyof ModeComponent.ModeStatus<N>])) {
        return (
            <Fragment>
                {(
                    status[name as keyof ModeComponent.ModeStatus<N>] as Array<ModeComponent.ModeStatusItem<N>>
                )?.map((item: ModeComponent.ModeStatusItem<N>) => {
                    commonProps.component.mode.id = item.id;
                    commonProps.component.mode.onClose = (name?: N, id?: string) =>
                        onCloseMode({id: id || item.id, name: name || item.name});
                    return (
                        <DialogItem<T, string> key={item.id} id={item.id} {...commonProps.dialog} {...item?.options}>
                            {
                                isValidElement(children) && cloneElement(children, {
                                    key: item.id,
                                    ...commonProps.component,
                                    ...item?.props
                                })
                            }
                        </DialogItem>
                    )
                })}
            </Fragment>
        )
    }
    const statusItem: ModeComponent.ModeStatusItem<N> = status?.[name as keyof ModeComponent.ModeStatus<N>];
    return (
        <DialogItem<T, string> {...commonProps.dialog} {...statusItem?.options}>
            {isValidElement(children) &&
                cloneElement(children, {
                    ...commonProps.component,
                    ...statusItem?.props
                })
            }
        </DialogItem>
    )

}

export default MemoGeneralize(Dialog);