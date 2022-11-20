import styled from "styled-components";
import {DialogProcessFieldProps, DialogProcessType, ReturnValue} from "./types";
import useDialogProcessList from "./useDialogProcessList";
import useDialogProcessField from "./useDialogProcessField";
import TextInput from "../../elements/TextInput";
import {dialogConstants} from "../../../constants/modal/dialog.const";
import {ChangeEvent, MouseEvent} from "react";
import DialogProcessList from "./DialogProcessList";
import Injector from "../../elements/Injector";
import Button from "../../elements/Button/Button";
import {BsEraserFill, BsSearch} from "react-icons/bs";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import FieldMessage from "../../elements/FieldMessage";
import {currentStatus} from "../../../constants/types/status.const";
import DialogProcessFieldDialog from "./DialogProcessFieldDialog";

function DialogProcessField<T = ReturnValue>(props: DialogProcessFieldProps<T>) {
    const {getDialogProcessListProps, selected, setSelected} = useDialogProcessList({
        value: props.value,
        dispatch: props.dispatch
    });
    const {
        dialogStatus,
        handleRemoveItem,
        handleSubmit,
        handleReset,
        handleDispatch,
        handleChangeStatus
    } = useDialogProcessField<T>({...props, setSelected})
    return(
        <StyledDialogProcessFiled>
            <StyledDialogProcessControlField>
                {DialogProcessType.LIST_BOX !== props.type ? (
                    <TextInput
                        actionType={props.actionType}
                        value={props.value || ""}
                        name={props.name}
                        onKeyDown={event => {
                            if (event.key === "Enter") {
                                handleChangeStatus({id: dialogConstants.DIALOG_PROCESS_FIELD});
                            }
                        }}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleDispatch({name: props.name, value: String(event.target.value)})
                        }
                        width="160px"
                        disabled={props.disabled?.textInput}
                    />
                ) : (
                    <DialogProcessList {...getDialogProcessListProps()} />
                )}
                {DialogProcessType.LIST_BOX !== props.type ? (
                    <Injector
                        InjectTarget={Button}
                        injectProps={[
                            {
                                children: <BsSearch size={13} />,
                                onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                    props.onBeforeRequestOfDialog?.(event);
                                    handleChangeStatus({id: dialogConstants.DIALOG_PROCESS_FIELD});
                                },
                                disabled: props.disabled?.button?.[0]
                            },
                            {
                                children: <BsEraserFill size={13} />,
                                onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => handleReset(event)(),
                                disabled: props.disabled?.button?.[1]
                            }
                        ]}
                    />
                ) : (
                    <Injector
                        flexDirection="column"
                        InjectTarget={Button}
                        injectProps={[
                            {
                                children: <AiOutlinePlus/>,
                                onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                    props.onBeforeRequestOfDialog?.(event);
                                    handleChangeStatus({id: dialogConstants.DIALOG_PROCESS_FIELD});
                                },
                                styles: {margin: "0 2px 2px 2px"}
                            },
                            {
                                children: <AiOutlineMinus/>,
                                onClick: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => handleRemoveItem(event)(selected),
                            }
                        ]}
                    />
                )}
            </StyledDialogProcessControlField>
            <FieldMessage<currentStatus> message={props.message} status={props.messageStatus} />
            <DialogProcessFieldDialog
                value={props.value}
                status={dialogStatus}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                size={props.size}
                ConnectContent={props.ConnectContent}
            />
        </StyledDialogProcessFiled>
    )
}

export default DialogProcessField;

const StyledDialogProcessControlField = styled.div`
  display: flex;
  flex: 1;
`;

const StyledDialogProcessFiled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;