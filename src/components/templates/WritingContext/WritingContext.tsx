import styled from "styled-components";
import useWritingContext from "./useWritingContext";
import Pagination from "react-js-pagination";
import SubContext from "./SubContext";
import {useState} from "react";
import Page from "../../widgets/Page";

function WritingContext() {
  
  const {getPaginationData, page, setPage} = useWritingContext();
  
  return (
    <StyledWritingContext>
      {/*<SubContext titles={} contents={} users={} created={} modified={} />*/}
      <Page totalCount={10} setPage={setPage} page={page} size={5} sort={1} />
    </StyledWritingContext>
  )
}

export default WritingContext;

const StyledWritingContext = styled.div`
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