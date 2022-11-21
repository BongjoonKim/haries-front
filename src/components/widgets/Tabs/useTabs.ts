import {TabsComponent} from "./types";
import {Children, ReactElement, ReactNode, useEffect, useLayoutEffect, useState, MouseEvent} from "react";

interface useTabsProps {
    id?: string;
    children: TabsComponent.ChildrenProps[] | TabsComponent.ChildrenProps;
    removeTab?: TabsComponent.BaseComponentProps["removeTab"];
    onActiveTab: TabsComponent.BaseComponentProps["onActiveTab"];
    onRemoveTab?: (status: string) => void;
}

function useTabs(props: useTabsProps) {
    const [tabId, setTabId] = useState<string>("");
    const [items, setItems] = useState<any>([]);
    const [activeTab, setActiveTab] = useState<string>("");

    const handleSetMountedState = () => {
        setItems(Children.toArray(props.children));
        if (Array.isArray(props.children)) {
            const tempChildren = props.children[0];
            if (tempChildren) {
                const {id, label} = tempChildren.props;
                setActiveTab(id || label || "");
            }
        } else {
            const tempChildren = props.children;
            if (tempChildren.props) {
                const {id, label} = tempChildren.props;
                setActiveTab(id || label || "");
            }
        }
    };

    const handleFilterList = (child: ReactNode) => {
        const item = child as unknown as ReactElement<TabsComponent.ChildrenProps["props"]>;
        if (typeof props.removeTab !== "undefined") {
            return !props.removeTab?.has(item.props.id || item.props.label);
        }
        return true;
    }

    const handleFilterItem = (child: ReactNode) => {
        const tempChild = child as ReactElement<TabsComponent.ChildrenProps["props"]>;
        const status = tempChild.props?.id || tempChild.props.label;
        return !!(status === activeTab && tempChild.props.children);
    }

    const handleChangeActiveTab = ({tab}: {tab: string}) => {
        setActiveTab(tab);
        props.onActiveTab?.({tabId, tab});
    }

    const handleChangeRemoveTab = (tab: string, event?: MouseEvent<SVGElement, MouseEvent>) => {
        if (event) event.stopPropagation();
        props.onRemoveTab?.(tab);
    }

    useLayoutEffect(() => {
        handleSetMountedState();
    }, []);

    useEffect(() => {
        if (props?.id && !tabId) setTabId(props.id || "");
    }, [props?.id, tabId]);

    return {
        handleChangeActiveTab,
        handleChangeRemoveTab,
        handleFilterList,
        handleFilterItem,
        activeTab,
        items
    }
}

export default useTabs;