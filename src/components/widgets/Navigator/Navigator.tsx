import useNavigator from "./useNavigator";
import styled from "styled-components";
import NavigatorList from "./list/NavigatorList";

type NavigatorProps = {
    items: MenuItemVO[];
};

function Navigator(props: NavigatorProps) {
    const {clickRef, getNavigatorProps} = useNavigator();

    return (
        <StyledNavigator ref={clickRef}>
            {NavigatorList({
                items: props.items,
                ...getNavigatorProps()
            })}
        </StyledNavigator>
    )
}

export default  Navigator;

const StyledNavigator = styled.nav`
  min-width: 780px !important;
  height: 100%;
`;