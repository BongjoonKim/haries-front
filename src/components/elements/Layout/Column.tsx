import {createElement, CSSProperties, HTMLAttributes, ReactNode} from "react";
import converter from "../../../utilities/converter";
import styled from "styled-components";

interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    type?: "div" | "article" | "section" | "footer" | "header";
    width?: string;
    flex?: number | string;
    alignItems?: string;
    flexDirection?: string;
    justifyContent?: string;
    height?: string;
}

function Column(props: ColumnProps) {
    return createElement(props.type || "div", {
        className: converter.classNames([props.className]),
        style: props.style,
        width: props.width,
        height: props.height,
        flex: props.flex,
        alignItems: props.alignItems,
        flexDirection: props.flexDirection,
        justifyContent: props.justifyContent,
        children: props.children,
    });
}

const Wrapper = styled(Column)<{
    width?: string;
    height?: string;
    flex?: number | string;
    alignItems?: string;
    flexDirection?: string;
    justifyContent?: string;
}>`
  display: flex;
  flex-direction: ${props => props.flexDirection || "column"};
  align-items: ${props => props.alignItems || "stretch"};
  width: ${props => props.width || "initial"};
  height: ${props => props.height || "auto"};
  flex: ${props => props.flex || "initial"};
  justify-content: ${props => props.justifyContent || "initial"};
`;

export default Wrapper;