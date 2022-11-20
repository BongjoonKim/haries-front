import React, {CSSProperties, JSXElementConstructor, ReactElement, ReactFragment, ReactNode, ReactPortal} from "react";

export declare namespace TabsComponent {
    type Item = {
        id?: string;
        label: string;
        name?: string;
        children: ReactNode | ReactNode[];
        img?: string;
    };

    type ChildrenItem =
        | string
        | number
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactFragment
        | ReactPortal;

    interface ChildrenProps extends ReactElement {
        props: {
            id?: string;
            label: string;
            children: ReactNode | ReactNode[];
            style?: CSSProperties;
            name?: string;
            img?: string;
        }
    }

    interface BaseComponentProps {
        id?: string;
        panels?: {
            visible?: boolean;
            position?: "top" | "bottom" | "left" | "right";
        };
        reRender?: boolean;
        activeTab?: string;
        removeTab?: Set<string>;
        onActiveTab?: (parameter: {tabId?: string; tab: string}) => void;
        onRemoveTable?: (status: string, event?: MouseEvent<SVGElement, MouseEvent>) => void;
        name?: string;
        img?: string;
    };

}