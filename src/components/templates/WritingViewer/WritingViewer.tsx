import EditorViewer from "../../widgets/EditorViewer";
import useWritingViewer from "./useWritingViewer";
import {useParams} from "react-router-dom";
import {IconButton, Snackbar} from "@mui/material";
import MessageBar from "../../widgets/MessageBar";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

function WritingViewer() {
  // const {id} = useParams();
  // console.log("아이디값",  id)
  const {
    writing,
    title,
    MessageOpen,
    handleOnClose,
    warningMessage
  } = useWritingViewer();
  
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleOnClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )
  
  return (
    <>
      <h2>
        {title}
      </h2>
      <EditorViewer contents={writing} />
      <MessageBar open={MessageOpen} onClose={handleOnClose} message={warningMessage} action={action}/>
    </>
    
  )
}

export default WritingViewer;