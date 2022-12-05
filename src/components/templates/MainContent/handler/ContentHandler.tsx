import {ContentFooterHandler, ContentHeaderHandler} from "../../../../constants/types/main-content.const";
import {Content} from "../index";
import useClipboard from "../../../../hooks/state/useClipboard";
import messengerUtil from "../../../../utilities/messengerUtil";
import Button from "../../../elements/Button/Button";
import {AiOutlineLink} from "react-icons/all";
import {useDialogContext} from "../../../modules/Mode/frame/Dialog/DialogContext";
import {useModalContext} from "../../../widgets/Modal";

const ContentHeaderHandlerOrder: readonly ContentHeaderHandler[] = [
    ContentHeaderHandler.search,
    ContentHeaderHandler.submit,
    ContentHeaderHandler.update,
    ContentHeaderHandler.reset,
    ContentHeaderHandler.close,
    ContentHeaderHandler.link
] as const;

const ContentFooterHandlerOrder: readonly ContentFooterHandler[] = [
    ContentFooterHandler.search,
    ContentFooterHandler.submit,
    ContentFooterHandler.update,
    ContentFooterHandler.close,
    ContentFooterHandler.reset,
    ContentFooterHandler.link
] as const;

export function sortContentHeaderHandler(key1: ContentHeaderHandler, key2: ContentHeaderHandler) {
    const inx1 = ContentHeaderHandlerOrder.indexOf(key1);
    const inx2 = ContentHeaderHandlerOrder.indexOf(key2);
    return inx1 - inx2;
}

export function sortContentFooterHandler(key1: ContentFooterHandler, key2: ContentFooterHandler) {
    const inx1 = ContentFooterHandlerOrder.indexOf(key1);
    const inx2 = ContentFooterHandlerOrder.indexOf(key2);
    return inx1 - inx2;
}

export default {
    Link: (props: {link?: Content.HandlerProps["link"]}) => {
        const newClipboard = useClipboard();
        const handleCopyClipboard = () => {
            if (props.link) {
                Promise.resolve(newClipboard.handleCopyClipboard(props.link || "")).then(() =>
                messengerUtil.showMessageBox({text: "copy clipboard", visible: true}));
            } else {
                messengerUtil.showMessageBox({
                    text: "clipboard has no information",
                    visible: true
                })
            }
        };
        return (
            <Button onClick={handleCopyClipboard}>
                <AiOutlineLink size={20} />
            </Button>
        )
    },
    Close: (props: {onClose?: Content.HandlerProps["onClose"]}) => {
        const {onCloseMode, name, id} = useDialogContext();
        const {onChangeStatus} = useModalContext();
        const handleClose = () => {
            if (props.onClose) props.onClose();
            if (onCloseMode && name && typeof onCloseMode === "function") {
                onCloseMode({name, id});
            } else if (onChangeStatus && typeof onChangeStatus === "function") {
                onChangeStatus({id: ""})
            } else {
                return;
            }
        }
        return <Button onClick={handleClose}>Close</Button>
    },
    Submit: (props: {onSubmit: Content.HandlerProps["onSubmit"]}) => {
        return (
            <Button className="active" type="submit" onClick={props.onSubmit}>Submit</Button>
        )
    },
    Reset: (props: {onReset: Content.HandlerProps["onReset"]}) => {
        return <Button onClick={() => props.onReset?.()}>Reset</Button>
    },
    Search: (props: {onSearch: Content.HandlerProps["onSearch"]}) => {
        return <Button className="active line" onClick={() => props.onSearch?.()}>Search</Button>
    },
    Update: (props: {onUpdate: Content.HandlerProps["onUpdate"]}) => {
        return <Button className="active" onClick={() => props.onUpdate?.()}>Update</Button>
    }
}