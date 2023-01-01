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
    alignitems?: string;
    flexdirection?: string;
    justifycontent?: string;
    height?: string;
}

function Column(props: ColumnProps) {
    return createElement(props.type || "div", {
        className: converter.classNames([props.className]),
        style: props.style,
        width: props.width,
        height: props.height,
        flex: props.flex,
        alignitems: props.alignitems,
        flexdirection: props.flexdirection,
        justifycontent: props.justifycontent,
        children: props.children,
    });
}

const Wrapper = styled(Column)<{
    width?: string;
    height?: string;
    flex?: number | string;
    alignitems?: string;
    flexDirection?: string;
    justifycontent?: string;
}>`
  display: flex;
  flex-direction: ${props => props.flexdirection || "column"};
  align-items: ${props => props.alignitems || "stretch"};
  width: ${props => props.width || "initial"};
  height: ${props => props.height || "auto"};
  flex: ${props => props.flex || "initial"};
  justify-content: ${props => props.justifycontent || "initial"};
`;

export default Wrapper;