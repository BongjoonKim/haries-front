import {ReactNode} from "react";

declare namespace Content {
    interface CommonProps {
        id?: string;
        title?: string;
        form?: boolean;
        commonTheme?: string;
    }

    type DefaultAction = ((...args: any[]) => void | Promise<void> | never | any) | undefined;

    interface HandlerProps {
        link?: string;
        onSearch?: DefaultAction;
        onReset?: DefaultAction;
        onSubmit?: DefaultAction;
        onClose?: DefaultAction;
        onUpdate?: DefaultAction;
    }

    interface CustomHandlerProps {
        label: string;
        onClick: DefaultAction;
        className?: string;
        name?: string;
    }

    interface HeaderProps {
        id?: string;
        title?: string;
        headerTheme?: string;
    }

    interface BodySectionProps {
        title?: string;
        children?: ReactNode | ReactNode[];
    }

    interface BodySectionPartProps {
        title?: string;
        children?: ReactNode;
    }

    interface BodyProps {
        children?: ReactNode | ReactNode[];
    }

    interface FooterProps {
        footer?: ReactNode | ReactNode[];
    }
}