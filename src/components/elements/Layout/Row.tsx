import {createElement, CSSProperties, HTMLAttributes, ReactNode} from "react";
import converter from "../../../utilities/converter";
import styled from "styled-components";

interface RowProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    itemMargin?: string;
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
    alignItems?: string;
    onClick?: (...args: any[]) => void;
    type?: "div" | "article" | "section" | "footer" | "header";
    justifyContent?: string;
    flex?: number | string;
}

function Row(props: RowProps) {
    return createElement(props.type || "div", {
        className: converter.classNames([props.className, "row"]),
        style: props.style,
        itemMargin: props.itemMargin,
        width: props.width,
        height: props.height,
        alignItems: props.alignItems,
        justifyContent: props.justifyContent,
        margin: props.margin,
        padding: props.padding,
        onClick: props.onClick,
        children: props.children,
        flex: props.flex
    });
}

const Wrapper = styled(Row)<{
    itemMargin?: string;
    width?: string;
    height?: string;
    alignItems?: string;
    justifyContent?: string;
    margin?: string;
    padding?: string;
    flex?: number | string;
}>`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.alignItems || "initial"};
  justify-content: ${props => props.justifyContent || "initial"};
  width: ${props => props.width || "initial"};
  height: ${props => props.height || "initial"};
  margin: ${props => props.margin || "0px"};
  padding: ${props => props.padding || "0px"};
  flex: ${props => props.flex || "initial"};
  & > * ~ *:not(:last-of-type) {
    margin: ${props => (props.itemMargin ? `0 ${props.itemMargin}` : 0)};
  }
  & > * ~ *:first-of-type {
    margin-right: ${props => (props.itemMargin ? `0 ${props.itemMargin}` : 0)};
  }
  & > * ~ *:last-of-type {
    margin-left: ${props => (props.itemMargin ? `0 ${props.itemMargin}` : 0)};
  }
  &:last-child {
    margin-bottom: ${props => (props.itemMargin ? `0 ${props.itemMargin}` : 0)};
  }
`;

export default Wrapper;