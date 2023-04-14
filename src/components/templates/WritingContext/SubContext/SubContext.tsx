import styled from "styled-components";
import moment from "moment";
import {createElement} from "react";

interface SubContextProps {
  data : DocumentsDTO[];
}

function SubContext(props: SubContextProps) {
  console.log("글 목록 보기", props.data);
  const writings = props.data;
  
  return (
    <StyledSubContext>
      {writings.map((writing, index) => {
        let parser = new DOMParser();
        let documents = parser.parseFromString(writing.htmlContents, "text/html");
        console.log("도큐먼츠", documents.body.nodeValue);
        
        return (
        <StyledContextBox key={index}>
          <img />
          <h4>
            {writing.titles}
          </h4>
          <span>
            {documents?.body?.nodeValue}
          </span>
          <h6>
            {moment(writing.created).format("YYYY-MM-DD")}
          </h6>
        </StyledContextBox>
      )})}
    </StyledSubContext>
    
  )
}

export default SubContext;

const StyledSubContext = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
  justify-content:center;
  width : 90%;
  margin: 5vh auto;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  //
  @media screen and (min-width: 1250px) {
    grid-template-columns: repeat(3, 3fr);
    margin: 5vh auto;
  }

`;

const StyledContextBox = styled.div`
  border: 1px solid black;
  width : 100%;
  height : 40vh;
`;

const StyledExplainPart = styled.div`
  display: flex;
`;