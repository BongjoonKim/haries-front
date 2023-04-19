import EditorViewer from "../../widgets/EditorViewer";
import useWritingViewer from "./useWritingViewer";
import {useParams} from "react-router-dom";
import {Button, IconButton, Snackbar} from "@mui/material";
import MessageBar from "../../widgets/MessageBar";
import CloseIcon from "@mui/icons-material/Close";
import React, {lazy, Suspense} from "react";
import styled from "styled-components";
import {Viewer} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import moment from "moment";

function WritingViewer() {
  // const {id} = useParams();
  // console.log("아이디값",  id)
  const {
    writing,
    MessageOpen,
    handleOnClose,
    warningMessage,
    viewerRef,
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
          <div className="title">{writing.titles}</div>
          <div className="writing-info">
            <div className="user">{writing.modifiedUser}</div>
            <div className="created">{moment(writing.created).format("YY-MM-DD")}</div>
            <div className="edit-delete">
              <Button><span>수정</span></Button>
              <Button><span>삭제</span></Button>
            </div>
          </div>
          <EditorViewer writing={writing.contents} viewerRef={viewerRef} />
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
  height: 200%;
  text-align: center;
  margin: auto;
  border: 1px solid blue;
  .title {
    padding: 1rem 1rem;
    font-size: 5ch;
    font-weight: 800;
    color: black;
  }
  .user {
    float: left;
  }
  .created {
    float: left;
  }
  .writing-info {
    display: flex;
    align-items: center;
    .edit-delete {
      float: right !important;
    }
  }
`;