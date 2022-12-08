import {DialogProcessHandlerIconType} from "../types";
import {BsEraserFill, BsSearch} from "react-icons/bs";
import {IoMdCreate} from "react-icons/io";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

const icons = {
    [DialogProcessHandlerIconType.SEARCH]: BsSearch,
    [DialogProcessHandlerIconType.CREATE]: IoMdCreate,
    [DialogProcessHandlerIconType.REMOVE]: BsEraserFill,
    [DialogProcessHandlerIconType.PLUS]: AiOutlinePlus,
    [DialogProcessHandlerIconType.MINUS]: AiOutlineMinus,
}

function DialogProcessIcon({iconName} : {
    iconName: DialogProcessHandlerIconType;
}) {
    const Icon = icons[iconName];
    return <Icon />;
}

export default DialogProcessIcon;