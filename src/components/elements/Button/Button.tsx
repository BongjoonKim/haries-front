import {Button as MUIButton} from "@material-ui/core";
import ReactMarkdown from "react-markdown";

interface ButtonProps {
  children : string
  variant ?: "text" | "outlined" | "contained" | undefined
  color ?: any
}
function Button(props : ButtonProps) {
  return (
    <MUIButton
      children={props.children}
      variant={props.variant}
      color={props.color}
    />
  )
}

export default Button