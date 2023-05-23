import styled from "styled-components";
import useWritingContext from "./useWritingContext";
import Pagination from "react-js-pagination";
import SubContext from "./SubContext";
import React, {useState} from "react";
import Page from "../../widgets/Page";
import MessageBar, {action} from "../../widgets/MessageBar";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function WritingContext() {
  
  const {page, setPage, writings, totalContents} = useWritingContext();
  console.log("값 확인", totalContents)
  
  return (
    <StyledWritingContext>
      <SubContext data={[...writings]}/>
      <Page totalCount={totalContents} setPage={setPage} page={page} size={6} />
      <MessageBar open={message.isOpen} onClose={handleOnClose} message={message.contents} action={action}/>
    </StyledWritingContext>
  )
}

export default WritingContext;

const StyledWritingContext = styled.div`
  &:hover {
    mso-border-shadow: yes;
  }
  justify-content: center;
  height: 100%;
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