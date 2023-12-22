import {Button as MUIButton} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import {MouseEventHandler} from "react";
import styled from "styled-components";

interface ButtonProps {
  className ?: string;
  children : any;
  variant ?: "text" | "outlined" | "contained" | undefined
  color ?: any
  onClick ?: any;
  fullWidth?: boolean;
  backgroundColor?: string;
  disabled ?: boolean;
  styles?: {
    margin?: string;
    width?: string;
    padding?: string;
    height?: string;
  }
}
function CustomButton(props : ButtonProps) {
  return (
    <StyleCustomButton {...props.styles}>
      <MUIButton
        children={props.children}
        variant={props.variant}
        color={props.color}
        onClick={props.onClick}
        fullWidth={props.fullWidth}
        disabled={props.disabled}
      />
    </StyleCustomButton>
  )
}

export default CustomButton;

const StyleCustomButton = styled.div<{
  margin?: string;
  width?: string;
  padding?: string;
  height?: string;
  backgroundColor?: string;
}>`
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.backgroundColor};
`;