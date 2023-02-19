import useNavigator from "./useNavigator";
import styled from "styled-components";
import NavigatorList from "./list/NavigatorList";
import {MenuType} from "../../../../model/common/common-model";

type NavigatorProps = {
    className: string;
    items: MenuType[];
    loading?: boolean;
};

function Navigator(props: NavigatorProps) {
    const {clickRef, getNavigatorProps} = useNavigator();

    return (
        <StyledNavigator ref={clickRef}>
            {NavigatorList({
                items: props.items,
                ...getNavigatorProps()
            })}
        {/*    로딩 아이콘 보여주기   */}
        </StyledNavigator>
    )
}

export default  Navigator;

const StyledNavigator = styled.nav`
  width: 5rem;
  height: 100%;
`;