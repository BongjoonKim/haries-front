import {Popper as PopperMaterialUI} from "@material-ui/core";
import {ReactNode} from "react";

interface PopperProps {
  children : ReactNode;
  open: boolean;
  anchorEl : any;
  placement?:
    "top-start" | "top" | "top-end" |
    "left-start" | "left" | "left-end" |
    "right-start" | "right" | "right-end" |
    "bottom-start" | "bottom" | "bottom-end";
  disablePortal?: boolean;
  modifier?: Object;
  
}

function Popper(props : PopperProps) {
  return (
    <PopperMaterialUI
      placement={props.placement}
      disablePortal={props.disablePortal}
      open={props.open}
      modifiers={props.modifier}
      anchorEl={props.anchorEl}
      style={{zIndex: 11000}}
    >
      {props.children}
    </PopperMaterialUI>
  )
}

export default Popper;
