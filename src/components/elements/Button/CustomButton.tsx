import React from "react";
import styled from "styled-components";
import {ButtonHTMLAttributes, CSSProperties, ReactNode, memo} from "react";
import converter from "../../../utilities/converter";
import LinkButton from "./LinkButton";

export interface PopoverButtonProps {
    popover?: {
        visible : boolean;
        onVisible : (status ?: boolean) => void;
        children : ReactNode;
        containerStyle ?: CSSProperties | undefined;
    }
}

export interface ToggleButtonProps {
    toggle ?: {
        status : boolean;
        onToggle : (status?:boolean) => void;
        ToggleView : ReactNode;
    };
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PopoverButtonProps, ToggleButtonProps {
    to ?: string;
    onClick ?: (e : React.MouseEvent<HTMLButtonElement>) => void;
    as ?: React.ElementType;
    style ?: React.CSSProperties;
    styles ?: {
        margin ?: string;
        width ?: string;
        padding ?: string;
        height ?: string;
    };
    className ?: string;
    type ?: "button" | "submit" | "reset";
}

function CustomButton({
                    onClick,
                    children,
                    className,
                    popover,
                    toggle,
                    to,
                    styles,
                    ...rest
                } : ButtonProps) : JSX.Element {
    // @ts-ignore
    return (
        <Wrapper>
            <StyledButton
                role="button"
                className={converter.classNames([
                    "button",
                    toggle && "toggle",
                    className
                ])}
                onClick={
                    !to && (onClick ?? toggle?.onToggle)
                }
                {...styles}
                {...(to && { as : LinkButton})}
                {...rest}
            >
              {children}
            </StyledButton>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display : flex;
  position : relative;
`;

const StyledButton = styled.button<{
    width ?: string;
    margin ?: string;
    padding ?: string;
    height ?: string;
}> `
  display: flex;
  width : ${props => props.width || "initial"};
  height : ${props => props.width || "28px"};
  margin : ${props => props.width || "9 2px"};
  padding : ${props => props.width || "6px 12px"};
  justify-content: center;
  align-items: center;
  background: #f4f6f8;
  border: 1px solid #ccc;
  color : #444;
`
export default memo(CustomButton)