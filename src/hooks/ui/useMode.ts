import {useCallback, useState} from "react";
import {ModeComponent} from "../../types/mode";
import useInherentModeless from "./useInherentModeless";
import converter from "../../utilities/converter";
import {dependentOptionsPath} from "../../components/modules/Mode";
import GlobalModeNames from "../../constants/modes/global-mode.const";
import generatorUtil from "../../utilities/generatorUtil";
import {useRecoilState} from "recoil";
import recoilCommonState from "../../stores/recoil/recoilCommonState";

function useMode<T = string>() {
    const [status, setStatus] = useRecoilState(recoilCommonState.modalState);
    // const [status, setStatus] = useState<ModeComponent.ModeStatus<T>>({})
    
    const {
        taskItems,
        activeSequence,
        handleClearAllModeless,
        handleAddTaskItem,
        handleRemoveSequenceMode,
        handleRemoveTaskItem,
        handleActiveSequenceMode
    } = useInherentModeless<T>();

    const handleShowDependentMode = useCallback(
        (name: T, content: ModeComponent.DependentContent) => {
            setStatus((prevState: ModeComponent.ModeStatus<T>) =>
                converter.changeDynamicObjectValue(
                    prevState,
                    [name, dependentOptionsPath, GlobalModeNames.DEPENDENT_MODE].join("."),
                    content
                )
            );
            return false;
        },[]);

    const handleCloseDependentMode = useCallback((name: T) => {
        setStatus((prevState: ModeComponent.ModeStatus<T>) =>
            converter.objectRemoveKey(
                prevState,
                [name, dependentOptionsPath, GlobalModeNames.DEPENDENT_MODE].join(".")
            )
        )
        return false;
    },[]);

    const handleShowMode = useCallback(
        (name: T, props?: Record<string, any>, options?: ModeComponent.ModeStatusOptions) => {
            const addValue: Record<PropertyKey, any> = {
                name, props, options:{...options},
            }
            let nextValue: typeof addValue;
            let id: undefined | string;
            setStatus((prevState: ModeComponent.ModeStatus<T>) => {
                if (options?.isMulti) {
                    id = generatorUtil.uuid();
                    addValue.id = id;
                    addValue.options.showTimeCount =
                        Object.keys(status).length +
                        ((status[name as keyof ModeComponent.ModeStatus<T>] as Array<any>)?.length - 1);
                    const prevModeNameValue = prevState[name as keyof ModeComponent.ModeStatus<T>];
                    nextValue = ([prevModeNameValue] as Record<PropertyKey , any>[])
                        ?.flat()
                        ?.concat(addValue)
                        ?.filter(x => x);
                }else {
                    addValue.options.showTimeCount = Object.keys(status).length - 1;
                    nextValue = addValue;
                }
                return {
                    ...prevState,
                    [name as keyof ModeComponent.ModeStatus<T>]: nextValue
                }
            });
            handleActiveSequenceMode(id || name);
            return {name, id};
        },[handleActiveSequenceMode, status, generatorUtil.uuid()]);

    const handleVisibleStatus = useCallback(
        (name: T, id?: string): boolean => {
            if (id && Array.isArray(status[name as keyof ModeComponent.ModeStatus<T>])) {
                return (
                    status[name as keyof ModeComponent.ModeStatus<T>] as Array<ModeComponent.ModeStatusItem<T>>
                )?.some((item: ModeComponent.ModeStatusItem<T>) => item?.id === id);
            }
            return String(name) in status;
        },[status]);

    const handleCallbackCloseMode = useCallback((name: T, id?: string) => {
            const modeNameItem = status[name as keyof ModeComponent.ModeStatus<T>];
            if (Array.isArray(modeNameItem) && id) {
                (modeNameItem as Array<ModeComponent.ModeStatusItem<T>>).forEach(
                    item => item?.id === id && item?.options?.onCallbackCloseMode?.()
                );
            } else if ((modeNameItem as ModeComponent.ModeStatusItem<T>)?.options?.onCallCloseMode) {
                (modeNameItem as ModeComponent.ModeStatusItem<T>)?.options?.onCallbackCloseMode?.();
            }
        },[status]);

    const handleCloseAllMode = useCallback(() => {
        setStatus({});
        handleClearAllModeless();
    }, [handleClearAllModeless]);

    const setCloseMode = useCallback((name: T, id?: string) => {
        const modeNameItem = status[name as keyof ModeComponent.ModeStatus<T>];
        if (Array.isArray(modeNameItem) && id) {
            setStatus(prevState => {
                return {
                    ...prevState,
                    [name as keyof ModeComponent.ModeStatus<T>]: (
                        modeNameItem as Array<ModeComponent.ModeStatusItem<T>>
                    ).filter(item => item?.id !== id)
                }
            })
        } else {
            console.log("status", status)
    
            const nextState = converter.objectRemoveKey(status, name as keyof T);
            setStatus(nextState);
        }
        handleCallbackCloseMode(name, id);
        handleRemoveTaskItem(id || name);
        handleRemoveSequenceMode(id || name);
    },[handleCallbackCloseMode, handleRemoveSequenceMode, handleRemoveTaskItem, status])

    const handleCloseMode = useCallback(
        (parameter: ModeComponent.onCloseModeParameter<T> | ModeComponent.onCloseModeParameter<T>[]) => {
            const helperCloseMode = (item: ModeComponent.onCloseModeParameter<T>) => {
                if (typeof item === "string") setCloseMode(item);
                else setCloseMode(item.name, item.id);
            }
    
            if (parameter instanceof Array) {
                parameter.forEach(item => helperCloseMode(item));
            } else {
                helperCloseMode(parameter);
            }
            return parameter;
        },[setCloseMode]
    )

    const handleActiveEffect = useCallback(
        ({active, name, id} : {active: boolean; name: T; id?: string}) => {
            if (active) handleCloseMode({name, id});
            else handleShowMode(name);
        }, [handleCloseMode, handleShowMode]
    );

    const getModeProps = useCallback(() => ({
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
        onVisibleStatus: handleVisibleStatus,
        onActiveEffect: handleActiveEffect,
        getModeRouterProps: getModeProps,
        getModeProps
    }),[
        activeSequence,
        handleActiveSequenceMode,
        handleAddTaskItem,
        handleCloseDependentMode,
        handleCloseMode,
        handleRemoveTaskItem,
        handleRemoveSequenceMode,
        handleShowDependentMode,
        handleShowMode,
        handleVisibleStatus,
        status,
        taskItems
    ]);

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