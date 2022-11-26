import {DialogProcessItems} from "../types";
import TextInput from "../../../elements/TextInput/TextInput";

function DialogProcessText({...rest}: DialogProcessItems.DialogProcessTextProps) {
    return <TextInput width="160px" {...rest} />;
}

export default DialogProcessText;