import {Popover, PopoverProps} from "@mui/material";
import {useState} from "react";

interface CustomPopoverProps extends PopoverProps {

}

function CustomPopover(props: CustomPopoverProps) {
  
  return (
    <Popover {...props}/>
  )
}

export default CustomPopover;