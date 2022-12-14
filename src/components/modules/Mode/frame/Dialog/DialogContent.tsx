import {createElement, MouseEvent} from "react";
import {ModeFrame} from "../../../../../types/mode";
import GlobalModeNames from "../../../../../constants/modes/global-mode.const";
import {ModeTypes, Dialog } from "../../index";

import styled from "styled-components";

function DialogDependentMode<N>({
    status,
    name,
    onCloseDependentMode,
    onVisibleStatus
} : ModeFrame.DialogDependentMode<N>) {
    const dependent = (status as Record<string, any>)?.[
        String(name) as unknown as string
        ]?.options?.dependent;

    return (
        dependent?.[GlobalModeNames.DEPENDENT_MODE] && (
            <Dialog<ModeTypes, GlobalModeNames>
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
                onVisibleStatus={onVisibleStatus}
            />
        )
    );
}

export default function DialogContent<N=string>({
    children,
    construct,
    status,
    name,
    onCloseDependentMode,
    onVisibleStatus
} : ModeFrame.DialogContent<N>) {
    return (
        <Wrapper onClick={(e : MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            {children || (
                <>
                    <aside className="dialog-aside">{construct?.aside}</aside>
                    <header className="dialog-header">{construct?.title}</header>
                    <div className="dialog-body">{construct?.body}</div>
                    <footer className="dialog-footer">{construct?.footer}</footer>
                </>
            )}
            <DialogDependentMode name={name} status={status} onCloseDependentMode={onCloseDependentMode} onVisibleStatus={onVisibleStatus} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  .dialog {
    &-header {
      font-size: 24px;
      font-family: inherit;
      font-weight: normal;
      margin-bottom: 15px;
    }
    &-body {
      padding-bottom: 80px;
      max-height: 100%;
      overflow: auto;
    }
  }
`;