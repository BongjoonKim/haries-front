import styled from "styled-components";
import TabsItem from "./TabsItem";
import {TabsComponent} from "./types";
import useTabs from "./useTabs";
import TabList from "./list/TabList";
import TabPanels from "./TabsPanels";

interface TabsProps extends TabsComponent.BaseComponentProps {
    children: TabsComponent.ChildrenProps[] | TabsComponent.ChildrenProps;
}

function Tabs({id, children, removeTab, onActiveTab, onRemoveTab, panels, reRender}: TabsProps) {
    const newTabs = useTabs({
        id, children, removeTab, onActiveTab, onRemoveTab
    });

    return (
        <StyledTabs>
            <TabList
                children={newTabs.items}
                activeTab={newTabs.activeTab}
                removeTab={removeTab}
                onActiveTab={newTabs.handleChangeActiveTab}
                onRemoveTab={onRemoveTab && newTabs.handleChangeRemoveTab}
                onFilterList={newTabs.handleFilterList}
            />
            {panels?.visible !== false && (
                <TabPanels
                    children={children}
                    activeTab={newTabs.activeTab}
                    reRender={reRender}
                    onFilterList={newTabs.handleFilterList}
                    onFilterItem={newTabs.handleFilterItem}
                />
            )}
        </StyledTabs>
    )

}

Tabs.Item = TabsItem
export default Tabs;

const StyledTabs = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
`;