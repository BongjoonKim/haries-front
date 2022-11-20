import {CSSProperties, JSXElementConstructor, ReactElement} from "react";
import Modal from "../Modal";
import DialogContent from "../../modules/Mode/frame/Dialog/DialogContent";
import DialogContents from "./DialogContents";

function Dialog(props: {
    id: string | number;
    status: Modal.status;
    onChangeStatus?: Modal.onChangeStatus;
    title?: string;
    body?: ReactElement<any, string | JSXElementConstructor<any>>;
    children?: ReactElement<any, string | JSXElementConstructor<any>>;
    size?: Modal.boxSize;
    padding?: string | number | 0;
    closeStyle?: CSSProperties;
}) {
    return (
        <Modal
            id={props.id}
            status={props.status}
            onChangeStatus={props.onChangeStatus}
            size={props.size}
            closeStyle={props.closeStyle}
        >
            <DialogContents
                size={props.size}
                children={props.children}
            />
        </Modal>
    )
}
export default Dialog;