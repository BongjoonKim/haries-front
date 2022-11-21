import {
    Children,
    cloneElement,
    JSXElementConstructor,
    ReactElement,
    ReactFragment,
    ReactNode,
    ReactPortal
} from "react";
import {TabsComponent} from "./types";
import {memo} from "react";
import styled from "styled-components";

interface TabsPanelsProps {
    children:
        | string | number | boolean
        | ReactElement<
            TabsComponent.ChildrenProps["props"],
            string | JSXElementConstructor<TabsComponent.ChildrenProps["props"]>
        >
        | ReactFragment | ReactPortal | null | undefined;
    activeTab: string;
    onFilterList: (child: ReactNode) => boolean;
    onFilterItem: (child: ReactNode) => boolean;
    reRender?: boolean;
}

function TabPanels(props: TabsPanelsProps) {
    const handlePanelDisplay = (child: ReactElement<TabsComponent.ChildrenProps["props"]>) => {
        if (!props.reRender) {
            return props.onFilterItem(child) ? "flex" : "none";
        }
        return undefined;
    }

    return (
        <StyledPanels>
            {Children.toArray([
                Array.isArray(props.children) ? props.children : new Array(props.children),
            ])
                ?.filter(props.onFilterList)
                ?.filter(child => (props.reRender ? props.onFilterItem(child) : true))
                ?.map((child: TabsPanelsProps["children"]) => {
                    return cloneElement(
                        <StyledPanelWrapper />,
                        {
                            display: handlePanelDisplay(
                                child as ReactElement<TabsComponent.ChildrenProps["props"]>
                            )
                        },
                        (child as ReactElement<TabsComponent.ChildrenProps["props"]>)?.props?.children
                    )
                })}
        </StyledPanels>
    )
}

export default memo(TabPanels);

const StyledPanels = styled.div`
  font-size: 13px;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledPanelWrapper = styled.div<{display?: "flex" | "none"}>`
  display: ${props => props.display || "flex"};
  flex-flow: column nowrap;
  height: inherit;
`;