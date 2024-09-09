import styled from "styled-components";
import useWritingContext from "./useWritingContext";
import Pagination from "react-js-pagination";
import SubContext from "./SubContext";
import React, {useState} from "react";
import Page from "../../widgets/Page";
import MessageBar, {Action} from "../../widgets/MessageBar";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface WritingContextProps {
  folderId : string;
  setFolderId : any;
}

function WritingContext(props:WritingContextProps) {
  
  const {page, setPage, writings, totalContents, message, handleOnClose} = useWritingContext(props);
  return (
    <StyledWritingContext>
      <SubContext data={[...writings]}/>
      <Page totalCount={totalContents} setPage={setPage} page={page} size={6} />
      <MessageBar open={message.isOpen} onClose={handleOnClose} message={message.contents} action={Action()}/>
    </StyledWritingContext>
  )
}

export default WritingContext;

const StyledWritingContext = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  &:hover {
    mso-border-shadow: yes;
  }
  justify-content: center;
  flex: 1;
 .pagination {
   display: flex;
   justify-content: center;
   margin-top: 15px;
   list-style: none;
   padding: 0;
   
   li {
     display: inline-block;
     width: 30px;
     height: 30px;
     border: 1px solid #e2e2e2;
     display: flex;
     justify-content: center;
     align-items: center;
     font-size: 1rem;
     
     &:first-child {
       border-radius: 5px 0 0 5px;
     }
     &:last-child {
       border-radius: 0 5px 5px 0;
     }
     
     a {
       text-decoration: none;
       color: #337ab7;
       font-size: 1rem;

       &:hover, &:active {
         color: blue;
       }
     }
     &:active a{
       color: white;
     }
   }
   .page-selection {
     width: 48px;
     height: 30px;
     color: #337ab7;
   }
 }
 
`;