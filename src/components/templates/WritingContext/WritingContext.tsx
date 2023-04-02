import styled from "styled-components";
import useWritingContext from "./useWritingContext";
import Pagination from "react-js-pagination";
import SubContext from "./SubContext";
import {useState} from "react";

function WritingContext() {
  const [page, setPage] = useState<number>(1);
  
  const {getPaginationData} = useWritingContext();
  
  return (
    <StyledWritingContext>
      
    </StyledWritingContext>
  )
}

export default WritingContext;

const StyledWritingContext = styled.div`

`;