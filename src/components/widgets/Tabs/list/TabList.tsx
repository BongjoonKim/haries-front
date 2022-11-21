import styled from "styled-components";
import {TabsComponent} from "../types";
import {Children, ReactElement, ReactNode} from "react";
import Tab from "./Tab";

interface TabListProps extends TabsComponent.BaseComponentProps {
    children: TabsComponent.ChildrenProps | TabsComponent.ChildrenProps[];
    onFilterList: (child: ReactNode) => boolean;
}

function TabList(props: TabListProps) {
    return (
        <StyledTabList>
            {Array.isArray(props.children) &&
            Children.toArray(props.children)
                ?.filter(props.onFilterList)
                ?.map((child): JSX.Element => {
                    const item = child as ReactElement<TabsComponent.ChildrenProps["props"]>;
                    return (
                        <Tab
                            activeTab={props.activeTab}
                            removeTab={props.removeTab}
                            key={item.props.id || item.props.label}
                            id={item.props.id || item.props.label}
                            style={item.props?.style}
                            label={item.props?.label}
                            onActiveTab={props.onActiveTab}
                            onRemoveTab={props.onRemoveTab}
                            img={item.props?.img}
                        />
                    )
                })
            }
        </StyledTabList>
    )
}

export default TabList;

const StyledTabList = styled.ul`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  border-bottom: 1px solid #b3b7ba;
  margin-bottom: 4px;
`;