import {ConnectContent} from "./types";
import ModalPortal from "../Modal/ModalProtal";
import Dialog from "../Dialog/Dialog";
import {dialogConstants} from "../../../constants/modal/dialog.const";
import {createElement} from "react";

interface DialogProcessFieldDialog {
    status: Modal.status;
    value?: string;
    onChangeStatus: (parameter: Modal.status) => void;
    onSubmit: (value: string | Record<string, any>) => void | Promise<void>;
    ConnectContent: ConnectContent;
    size?: Modal.boxSize;
}

function DialogProcessFieldDialog({
    ConnectContent,
    onChangeStatus,
    onSubmit,
    status,
    value,
    size
}: DialogProcessFieldDialog) {
    const CommonProperty = {
        onSubmit,
        onClose: () => onChangeStatus({id: ""}),
        value
    };
    return (
        <ModalPortal>
            <Dialog
                id={dialogConstants.DIALOG_PROCESS_FIELD}
                status={status}
                onChangeStatus={onChangeStatus}
                size={size}
                children={
                    Array.isArray(ConnectContent)
                    ? createElement(
                        ConnectContent[0],
                        Object.assign(ConnectContent[1] || {}, {
                            ...CommonProperty
                        })
                    )
                    : createElement(ConnectContent, {
                        ...CommonProperty
                    })
                }
            />
        </ModalPortal>
    )
}

export default DialogProcessFieldDialog;