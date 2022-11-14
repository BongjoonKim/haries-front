import useNavigator from "./useNavigator";

type NavigatorProps = {
    items: MenuItemVO[];
};

function Navigator(props: NavigatorProps) {
    const {clickRef, getNavigatorProps} = useNavigator();

    return (
        <span></span>
    )
}

export default  Navigator