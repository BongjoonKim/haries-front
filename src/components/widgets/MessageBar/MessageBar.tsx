import {IconButton, Snackbar} from "@mui/material";
import React, {ReactNode, SyntheticEvent, useCallback} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {useRecoilState} from "recoil";
import recoilCommonState from "../../../stores/recoil/recoilCommonState";

interface  MessageBarProps {
  open : boolean;
  autoHideDuration ?: number;
  onClose : (event : SyntheticEvent | Event, reason?: string) => void;
  message : string;
  action ?: ReactNode;
  
  
}

export function Action() {
  const [message, setMessage]  = useRecoilState<{isOpen : boolean, contents : string}>(recoilCommonState.messageOpener);
  const handleOnClose = useCallback((event: SyntheticEvent | Event, reasion?: string) => {
    if (reasion === 'clickaway') {
      return;
    }
    setMessage({isOpen : false, contents : ""});
  },[message]);
  
  return (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleOnClose}
      >
        <CloseIcon fontSize="small"/>
      </IconButton>
    </>
    )
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