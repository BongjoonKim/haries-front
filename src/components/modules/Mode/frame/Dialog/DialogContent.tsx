import {createElement} from "react";
import {ModeFrame} from "../../../../../types/mode";
import GlobalModeNames from "../../../../../constants/modes/global-mode.const";
import Dialog from "./Dialog";
import {ModeTypes} from "../../router/generate";

function DialogDependentMode<N>({
    status,
    name,
    onCloseDependentMode,
} : ModeFrame.DialogDependentMode<N>) {
    const dependent = (status as Record<string, any>)?.[
        String(name) as unknown as string
        ]?.options?.dependent;

    return (
        dependent?.[GlobalModeNames.DEPENDENT_MODE] && (
            <Dialog <ModeTypes, GlobalModeNames>
                type = {ModeTypes.MODAL}
                name = {GlobalModeNames.DEPENDENT_MODE}
                children={
                    dependent?.[GlobalModeNames.DEPENDENT_MODE] &&
                    (Array.isArray(dependent[GlobalModeNames.DEPENDENT_MODE])
                    ? createElement(
                            dependent[GlobalModeNames.DEPENDENT_MODE][0],
                            dependent[GlobalModeNames.DEPENDENT_MODE][1]
                        ): createElement(dependent[GlobalModeNames.DEPENDENT_MODE]))
                }
                status={dependent || {}}
                onCloseMode={() => onCloseDependentMode?.(name)}
                dependent
            />
        )
    );
}