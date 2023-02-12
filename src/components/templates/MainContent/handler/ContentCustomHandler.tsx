import Button from "../../../elements/Button/CustomButton";
import {Content} from "../index";

interface ContentCustomHandlerProps {
    customHandlers: Content.CustomHandlerProps[];
    type: "header" | "footer";
}

function ContentCustomHandlerItem({label, onClick, className}: Content.CustomHandlerProps) {
    return (
        <Button onClick={onClick} className={className}>
            {label}
        </Button>
    )
}

function ContentFooterCustomHandler({customHandlers} : ContentCustomHandlerProps) {
    return (
        <>
            {Array.isArray(customHandlers) &&
                customHandlers?.map(({label, onClick, className}: Content.CustomHandlerProps) => (
                 <ContentCustomHandlerItem label={label} onClick={onClick} key={label} className={className} />
                ))
            }
        </>
    )
}

export default ContentFooterCustomHandler;