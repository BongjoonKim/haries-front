import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {BsEraser, BsSearch} from "react-icons/bs";
import {dialogConstants} from "../../../constants/modal/dialog.const";
import {DialogProcessType} from "./types";
import Injector from "../../elements/Injector";
import Button from "../../elements/Button/Button";

interface DialogProcessHandlerProps {
    onChangeStatus: any;
    onReset: any;
    onRemoveItem: any;
    type: string;
    selected: any;
}

function DialogProcessHandler({
    type, onChangeStatus, onReset, onRemoveItem, selected
}: DialogProcessHandlerProps) {
    const injectPropsMap = {
        list: [
            {
                children: <AiOutlinePlus />,
                onClick: () => onChangeStatus({id: dialogConstants.DIALOG_PROCESS_FIELD}),
                styles: {margin: "0 2px 2px 2px"}
            },
            {
                children: <AiOutlineMinus />,
                onClick: () => onRemoveItem(selected)
            }
        ],
        default: [
            {
                children: <BsSearch />,
                onClick: () => onChangeStatus({id: dialogConstants.DIALOG_PROCESS_FIELD}),
            },
            {
                children: <BsEraser />,
                onClick: onReset
            }
        ]
    };

    const getInjectProps = (type: string) => {
        switch (type) {
            case DialogProcessType.LIST_BOX:
                return injectPropsMap.list;
            case DialogProcessType.TEXT_BOX:
                return injectPropsMap.default;
            default:
                return injectPropsMap.default;
        }
    }
    
    return (
        <Injector injectProps={getInjectProps(type)} InjectTarget={Button} />
    )
}

export default DialogProcessHandler;