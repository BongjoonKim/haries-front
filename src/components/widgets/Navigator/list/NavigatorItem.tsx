import {NavigatorCommonProps, NavigatorItemProps} from "./types";
import {useUserMainMenu} from "../../../../hooks/users/useUserMainMenu";
import {useCallback, useMemo} from "react";
import useClickOutside from "../../../../hooks/sensor/useClickOutside";
import {useTransition} from "react-spring";
import converter from "../../../../utilities/converter";
import styled from "styled-components";

function NavigatorItem(props: NavigatorItemProps) {
    const {activeMenuItemVO, linkMenu} = useUserMainMenu();

    const isChildrenActive = useCallback((menuItemVO: MenuItemVO) => {
        if (!menuItemVO.children) return false;
        const menuChildren = menuItemVO.children as MenuItemVO[];
        const findInx = menuChildren.findIndex(itemVO => {
            let findResult = itemVO.id === activeMenuItemVO?.id;
            if (!findResult) {
                findResult = isChildrenActive(itemVO);
            }
            return findResult
        });
        return findInx > -1
    }, [activeMenuItemVO]);

    const menuActiveClass = useMemo(() => {
        if (activeMenuItemVO?.id === props.item.id) {
            return "is-active";
        }
        if (isChildrenActive(props.item)) return "is-active";
        return undefined;

    }, [activeMenuItemVO, props.item]);

    // 메뉴 아이템 재귀적 렌더링
    const RecursiveMenuItem = useCallback(
        ({
            type,
            status,
            onSetStatus,
            onResetStatus
        }: {
            type: NavigatorItemProps["type"];
        } & NavigatorCommonProps) => {
            if (Array.isArray(props.item.children)) {
                return props.item.children.map((item: MenuItemVO) => (
                    <NavigatorItem
                        key={item.id}
                        item={item}
                        type={type}
                        status={status}
                        onSetStatus={onSetStatus}
                        onResetStatus={onResetStatus}
                    />
                ))
            }
            return undefined;
        }, [props.item]);

    const transitions = useTransition ( props.item.id === props.status[props.type as NavigatorItemProps["type"]],
    {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
    });

    const handleClassNames = useCallback((): string => {
        const className: string[] = ["nav-item"];
        if (props.className) className.push(props.className);
        className.push(props.type);
        return converter.classNames(className)
    }, [props]);

    const handleRecursiveItemType = useCallback(() => {
        if (props.type === "primary") return "secondary";
        if( props.type === "secondary") return "tertiary";
        return "quaternary";
    }, [props.type])

    return (
        <StyledNavigator>

        </StyledNavigator>
    )
}

export default NavigatorItem;

const StyledNavigator = styled.li`
  position: relative;
  .nav-link {
    display: flex;
    align-items: center;
  }
`;
