import {NavigatorListProps} from "./types";
import NavigatorItem from "./NavigatorItem";
import styled from "styled-components";
import {createElement} from "react";

function NavigatorList(props: NavigatorListProps) {
    const NavigatorItems = (): JSX.Element[] => {
        return props.items.map((menuItemVO: MenuItemVO) => (
            <NavigatorItem
                key={menuItemVO.menuName}
                item={menuItemVO}
                status={props.status}
                onSetStatus={props.onResetStatus}
                onResetStatus={props.onResetStatus}
                className="nav-item"
                type="primary"
            />
        ));
    };

    return (
        <StyledNavigatorList className="nav-list primary">
            {createElement(props.PanelComponent || "div", {
                children: NavigatorItems(),
            })}
        </StyledNavigatorList>
    )
}

export default NavigatorList;

const StyledNavigatorList = styled.ul`
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;
  & > div {
    height: 100%;
    display: flex;
  }
  
`;