import {Button as MUIButton} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import {MouseEventHandler} from "react";

interface ButtonProps {
  className ?: string;
  children : any;
  variant ?: "text" | "outlined" | "contained" | undefined
  color ?: any
  onClick ?: MouseEventHandler;
}
function Button(props : ButtonProps) {
  return (
    <MUIButton
      children={props.children}
      variant={props.variant}
      color={props.color}
      onClick={props.onClick}
    />
  )
}

export default Button