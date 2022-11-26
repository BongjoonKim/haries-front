import styled from "styled-components";
import {DialogProcessCommon, DialogProcessField as DialogProcessFieldType, DialogProcessType} from "./types";
import useDialogProcessField from "./useDialogProcessField";
import {DialogProcessCombo, DialogProcessList, DialogProcessText} from "./items";
import {DialogProcessHandler, DialogProcessMode} from "./views";
import {currentStatus} from "../../../constants/types/status.const";
import ReturnValue = DialogProcessCommon.ReturnValue;
import FieldMessage from "../../elements/FieldMessage";

function DialogProcessField<T = ReturnValue>(props: DialogProcessFieldType.ContentMapProps<T>) : JSX.Element {
    const {
        handleSubmit,
        handleReset,
        handleRemoveItem,
        getDialogProcessTextProps,
        getDialogProcessListProps,
        getModeProps,
        handleShowMode,
        handleCloseMode,
        selected
    } = useDialogProcessField<T>({...props});

    return(
        <StyledDialogProcessFiled>
            <StyledDialogProcessControlField>
                {
                    {
                        [DialogProcessType.LIST_BOX] : <DialogProcessList {...getDialogProcessListProps()} />,
                        [DialogProcessType.TEXT_BOX] : <DialogProcessText {...getDialogProcessTextProps()} />,
                        [DialogProcessType.COMBO_BOX] : <DialogProcessCombo options={props.options || []} />
                    }[props.type || DialogProcessType.TEXT_BOX]
                }
                <DialogProcessHandler
                    onShowMode={handleShowMode}
                    onReset={handleReset}
                    onRemoveItem={handleRemoveItem}
                    contentMaps={props.contentMaps}
                    type={props.type || DialogProcessType.TEXT_BOX}
                    selected={selected}
                    onSubmit={handleSubmit}
                    value={props.value}
                    disabledSet={props.disabled?.handlers || props.disabled?.button}
                />
            </StyledDialogProcessControlField>
            <FieldMessage<currentStatus> message={props.message} status={props.messageStatus} />
            <DialogProcessMode
                value={props.value}
                onSubmit={handleSubmit}
                ConnectContent={props.ConnectContent}
                contentMaps={props.contentMaps}
                getModeProps={getModeProps as never}
                onCloseMode={handleCloseMode}
                size={props.size}
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