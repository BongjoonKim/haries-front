import {degree} from "../../../modules/TreeView/constants";
import {FunctionComponent} from "react";

type depth = 0 | number;

export type NavigatorCommonProps = {
    status: {
        [x in typeof degree[depth]]: string;
    }
    onSetStatus: (type: string, value: string) => void;
    onResetStatus: () => void;
}

export interface NavigatorItemProps extends NavigatorCommonProps {
    item: MenuItemVO;
    type: typeof degree[depth];
    className?: string;
}

export interface NavigatorListProps extends NavigatorCommonProps {
    items: MenuItemVO[];
    PanelComponent?: FunctionComponent<{children: JSX.Element[] | JSX.Element}>
}