import {NavigatorCommonProps, NavigatorItemProps} from "./types";
import {useUserMainMenu} from "../../../../../hooks/users/useUserMainMenu";
import {createElement, useCallback, useMemo} from "react";
import useClickOutside from "../../../../../hooks/sensor/useClickOutside";
import {useTransition} from "react-spring";
import converter from "../../../../../utilities/converter";
import styled from "styled-components";
import {BsDot} from "react-icons/bs";
import {MdOutlineArrowRight} from "react-icons/md";
import {animated} from "react-spring";

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
        <StyledNavigator
            onClick={() => Promise.resolve(props.onSetStatus(props.type, props.item.id as string)).then(() => {
                if (props.item.children?.length === 0) props.onResetStatus();
            })}
            className={handleClassNames()}
        >
            <div
                role="button"
                onClick={() => linkMenu(props.item)}
                className={converter.classNames(["nav-link",props.type, menuActiveClass])}
            >
                <div className = "nav-link-start">
                    {props.type !== "primary" &&
                        (Array.isArray(props.item.children) && props.item.children.length < 0 ? (
                            <StyledDot>
                                <BsDot />
                            </StyledDot>
                        ): (
                            <StyledFavorite>
                                <span>사용자 마이 메뉴 등록하는 곳</span>
                            </StyledFavorite>
                        ))}
                    <span className="nav-link-title">{props.item.menuLabel}</span>
                </div>
                <div className="nav-link-end">
                    {props.type !== "primary" &&
                        Array.isArray(props.item.children) &&
                        props.item.children.length > 0 && <MdOutlineArrowRight />
                    }
                </div>
            </div>
            {transitions(
                ({opacity}, item) =>
                    item && (
                        <animated.div
                            style={{
                                opacity: opacity.to({range: [0.0, 0.1], output: [0, 1]})
                            }}
                        >
                            {createElement(StyledNavigatorList, {
                                className: converter.classNames([
                                    "nav-list",
                                    props.type,
                                    handleRecursiveItemType()
                                ]),
                                children: RecursiveMenuItem({
                                    type: handleRecursiveItemType(),
                                    status: props.status,
                                    onSetStatus: props.onSetStatus,
                                    onResetStatus: props.onResetStatus
                                })
                            })}
                        </animated.div>
                    ),
            )}
        </StyledNavigator>
    )
}

export default NavigatorItem;

const StyledNavigator = styled.li`
  list-style: none;
  position: relative;
  .nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    //padding: 0 15px;
    border: 0;
    outline: none;
    background-color: #cfd2d4;
    cursor: pointer;
    color: #444;
    font-size: 13px;
    text-align: left;
    font-family: "NotoSansCJKkr", "Roboto", "Montserrat", sans-serif;
    font-weight: 600;
    box-sizing: border-box;
    letter-spacing: -0.05rem;
    &:hover {
     color: #a50034;
      background-color: #f4f6f8;
    }
    &.is-active,
    &:active {
      color: #a50034;
      background-color: #ffecfa;
    }
    &-start,
    &-end {
      display: flex;
      align-items: center;
    }
    &-title {
      margin: 0 50px;
      font-size: 30px;
    }
  }
  .nav-link.primary {
    font-size: 0.9357rem;
    background-color: transparent;
    overflow: hidden;
    display: flex;
  }
`;

const StyledFavorite = styled.span`
    line-height: 20px;
    height: 20px;
`;

const StyledNavigatorList = styled.ul`
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  display: block;
  background: #fff;
  position: absolute;
  width: max-content;
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 15%) 0 0 30px 0;
  & .nav-item {
    padding: 0;
  }
  &:empty {
    display: none;
  }
  &.secondary {
    & > li {
      position: relative;
      display: flex;
      justify-content: flex-end;
      .nav-link {
        font-size: 13px;
        font-weight: initial;
      }
    }
  }
  &.tertiary,
  &.quanternary {
    position: absolute;
    top: 0px;
    & > li {
      position: relative;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const StyledDot = styled.div`
    padding: 0 2px;
  & > svg {
    margin: -2px 0;
  }
`;