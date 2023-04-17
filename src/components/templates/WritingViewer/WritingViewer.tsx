import EditorViewer from "../../widgets/EditorViewer";
import useWritingViewer from "./useWritingViewer";
import {useParams} from "react-router-dom";
import {IconButton, Snackbar} from "@mui/material";
import MessageBar from "../../widgets/MessageBar";
import CloseIcon from "@mui/icons-material/Close";
import React, {lazy, Suspense} from "react";
import styled from "styled-components";
import {Viewer} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

function WritingViewer() {
  // const {id} = useParams();
  // console.log("아이디값",  id)
  const {
    writing,
    title,
    MessageOpen,
    handleOnClose,
    warningMessage,
    viewerRef
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
    writing !== undefined ?
      (
        <StyledWritingViewer>
          <h2>
            {title}
          </h2>
          <EditorViewer writing={writing} viewerRef={viewerRef} />
          <MessageBar open={MessageOpen} onClose={handleOnClose} message={warningMessage} action={action}/>
        </StyledWritingViewer>
      ) : (
      <></>
      )
  )
}

export default WritingViewer;

const StyledWritingViewer = styled.div`
  width : 80%;
  height: 20rem;
  text-align: center;
  margin: auto;
  border: 1px solid blue;
`;