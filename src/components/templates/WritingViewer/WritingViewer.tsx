import EditorViewer from "../../widgets/EditorViewer";
import useWritingViewer from "./useWritingViewer";
import {useParams} from "react-router-dom";
import {Button, IconButton, Snackbar} from "@mui/material";
import MessageBar from "../../widgets/MessageBar";
import CloseIcon from "@mui/icons-material/Close";
import React, {lazy, Suspense} from "react";
import styled from "styled-components";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import moment from "moment";
import CustomButton from "../../elements/Button";

function WritingViewer() {
  // const {id} = useParams();
  // console.log("아이디값",  id)
  const {
    writing,
    message,
    handleSaveOpen,
    handleOnClose,
    viewerRef,
    handleDelete,
  } = useWritingViewer();
  
  const EditorViewer = lazy(() => import("../../widgets/EditorViewer"));
  
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
        <StyledWritingViewer>
          <div className="title">{writing?.titles}</div>
          <div className="writing-info">
            <div className="user">
              <span>by. </span>
              <span>{writing?.modifiedUser}</span>
            </div>
            <div className="created">
              <span>Last Modified : </span>
              <span>{moment(writing?.created).format("YY/MM/DD")}</span>
            </div>
            <div className="edit-delete">
              <CustomButton onClick={handleSaveOpen}><span>수정</span></CustomButton>
              <CustomButton onClick={handleDelete}><span>삭제</span></CustomButton>
            </div>
          </div>
          <Suspense>
            <EditorViewer writing={writing?.contents} viewerRef={viewerRef} />
          </Suspense>
          <MessageBar open={message.isOpen} onClose={handleOnClose} message={message.contents} action={action}/>
        </StyledWritingViewer>
  )
}

export default WritingViewer;

const StyledWritingViewer = styled.div`
  padding: 1rem 1rem;
  width: 80%;
  min-height: 100vh;
  height: 100%;
  //text-align: center;
  margin: auto;
  background-color: white;

  .title {
    padding: 1rem 1rem;
    font-size: 5ch;
    font-weight: 800;
    color: black;
    text-align: center;
  }



  .writing-info {
    display: flex;
    background-color: #d7d7d7;
    align-items: center;
    height: 3rem;
    padding : 0.5rem 1rem;
    
    .user {
      float: left;
      > span {
        font-weight: 600;
      }
    }
    .created {
      float: left;
      padding-left: 1rem;
      opacity: 0.5;
      font-size: smaller;
    }
    
    .edit-delete {
      display: flex;
      margin-left: auto;
    }
  }
`;