import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {BsEraser, BsSearch} from "react-icons/bs";
import {dialogConstants} from "../../../../constants/modal/dialog.const";
import {DialogProcessBaseKey, DialogProcessType, DialogProcessViews} from "../types";
import Injector from "../../../elements/Injector";
import Button from "../../../elements/Button/BasicButton";
import {createElement} from "react";
import useDialogProcessHandler from "./useDialogProcessHandler";
import styled from "styled-components";

function DialogProcessModeHandler({
    children, onClick, disabled
}: DialogProcessViews.ModeHandlerProps) {
    return createElement(Button, {children, onClick, disabled});
}

function DialogProcessHandler({
    type, onReset, onRemoveItem,
    selected, onShowMode, disabledSet,
    ...props
}: DialogProcessViews.HandlerProps) {
    const [handlers] = useDialogProcessHandler({
        type, onReset, onRemoveItem,
        selected, onShowMode, ...props
    });

    return(
        <StyledDialogProcessHandler>
            {handlers.map(({onClick, children}: DialogProcessViews.HandlerButton, index: number) => {
                const key = `${DialogProcessBaseKey.HANDLER}-${index.toString()}`;
                return (
                    <DialogProcessModeHandler key={key} children={children}
                                              onClick={onClick} disabled={disabledSet?.[index]}
                    />
                )
            })}
        </StyledDialogProcessHandler>
    )
}


export default DialogProcessHandler;

const StyledDialogProcessHandler = styled.div`
  display: flex;
`;