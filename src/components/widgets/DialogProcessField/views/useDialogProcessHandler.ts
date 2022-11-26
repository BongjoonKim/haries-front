import {
    DialogProcessHandlerIconType,
    DialogProcessHandlerType,
    DialogProcessModeType,
    DialogProcessType,
    DialogProcessViews
} from "../types";
import generatorUtil from "../../../../utilities/generatorUtil";
import {createElement, MouseEvent, useCallback, useMemo} from "react";
import DialogProcessIcon from "./DialogProcessIcon";

function useDialogProcessHandler({
    type,
    onReset,
    onRemoveItem,
    selected,
    onShowMode,
    ...props
}: DialogProcessViews.HandlerProps) {
    const handleExtend = useCallback((flag?: string) => () => {
        onShowMode(generatorUtil.flagWithID(DialogProcessModeType.DIALOG_PROCESS_FIELD, flag));
    }, [onShowMode]);

    const handleRemove = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        if (type === DialogProcessType.LIST_BOX) onRemoveItem(event)(selected);
        else onReset(event)();
    },[onRemoveItem, onReset, selected, type]);

    const getHandlerDisplay = useCallback(
        (
            type: DialogProcessType,
            handlerType: DialogProcessHandlerType,
            display?: DialogProcessViews.HandlerDisplay
        ) => {
            switch (handlerType) {
                case DialogProcessHandlerType.EXTEND:
                    return (
                        display?.label
                        || createElement(DialogProcessIcon, {
                            iconName: display?.icon || (
                                type === DialogProcessType.LIST_BOX
                                    ? DialogProcessHandlerIconType.PLUS
                                    : DialogProcessHandlerIconType.SEARCH
                            )
                        })
                    )
                case DialogProcessHandlerType.REMOVE:
                    return createElement(DialogProcessIcon, {
                        iconName: type === DialogProcessType.LIST_BOX
                            ? DialogProcessHandlerIconType.MINUS
                            : DialogProcessHandlerIconType.REMOVE
                    });
                default:
                    break;
            }
        },[]);

    const handlerProps = useMemo(() => ({
        [DialogProcessHandlerType.EXTEND] : (parameter?: {
            display?: DialogProcessViews.HandlerDisplay;
            flag?: string;
        }) => {
            const handlerDisplay = getHandlerDisplay(
                type, DialogProcessHandlerType.EXTEND,
                parameter?.display
            );
            return {
                children: handlerDisplay,
                onClick: handleExtend(parameter?.flag)
            }
        },
        [DialogProcessHandlerType.REMOVE]: {
            children: getHandlerDisplay(type, DialogProcessHandlerType.REMOVE),
            onClick: handleRemove,
        }
    }),[type, handleExtend, handleRemove, getHandlerDisplay]);

    const handlers = useMemo(() => {
        if (props.contentMaps) {
            return props.contentMaps.map((item: DialogProcessViews.ContentMap, index: number) =>
                handlerProps[DialogProcessHandlerType.EXTEND]({
                    display: item.display,
                    flag: String(index)
                }),
            ).concat(handlerProps[DialogProcessHandlerType.REMOVE] as never);
        } else {
            return [
                handlerProps[DialogProcessHandlerType.EXTEND](),
                handlerProps[DialogProcessHandlerType.REMOVE]
            ]
        }
    },[handlerProps, props.contentMaps]);

    return [handlers];
}

export default useDialogProcessHandler;