import {Link, LinkProps} from "react-router-dom";

const isURL = (str : LinkProps["to"]) =>
    /^(?:\w+:)?\/\/(^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(String(str));

function LinkButton({ to, children, className } : LinkProps): JSX.Element {
    const isExternal = isURL(to);
    const As = isExternal ? "a" : Link;
    const props = {
        className,
        [isExternal ? "href" : "to"] : to
    } as unknown as LinkProps;

    return <As {...props} >{children}</As>;
}

export default LinkButton;

