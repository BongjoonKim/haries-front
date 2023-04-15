import {Snackbar} from "@mui/material";
import {ReactNode, SyntheticEvent} from "react";

interface  MessageBarProps {
  open : boolean;
  autoHideDuration ?: number;
  onClose : (event : SyntheticEvent | Event, reason?: string) => void;
  message : string;
  action ?: ReactNode;
  
  
}

function MessageBar(props : MessageBarProps) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.autoHideDuration}
      onClose={props.onClose}
      message={props.message}
      action={props.action}
    />
  )
}

export default MessageBar;