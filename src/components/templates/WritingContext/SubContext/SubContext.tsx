import styled from "styled-components";
import moment from "moment";
import {createElement} from "react";
import useSubContext from "./useSubContext";
import {DocumentDTO} from "../../../../types/dto/documentsInfo";

interface SubContextProps {
  data : DocumentDTO[];
}

function SubContext(props: SubContextProps) {
  console.log("글 목록 보기", props.data);
  const writings = props.data;
  const { contentsOnClick } = useSubContext();
  
  return (
    <StyledSubContext>
      {writings.map((writing, index) => {
        let parser = new DOMParser();
        let documents = parser.parseFromString(writing.contents!, "text/html");
        console.log("도큐먼트", documents);
        return (
        <StyledContextBox key={index} id={writing.id} onClick={contentsOnClick}>
          <img src={`${process.env.PUBLIC_URL}/serrata.jpeg`}/>
          <h4>
            {writing.title}
          </h4>
          <span>
            {documents?.body?.innerText}
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
  //width : 100%;
  //height: 100%;
  //margin: 5vh auto;
  //height: auto;
  padding: 0rem 2rem;
  flex: 1;
  margin : 0 10%;
  
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 2fr);
    flex: 1;
  }
  //
  @media screen and (min-width: 1250px) {
    grid-template-columns: repeat(3, 3fr);
    flex: 1;
    //margin: 5vh auto;
    //min-height: 100%;
  }

`;

const StyledContextBox = styled.div`
  //border: 1px solid black;
  width : 100%;
  height : 40vh;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px 0px;
  overflow: hidden;
  &:hover {
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    -webkit-transition: margin 0.5s ease-out;
    -moz-transition: margin 0.5s ease-out;
    -o-transition: margin 0.5s ease-out;
    padding-top: -5px;
    cursor:pointer;
  }

  img {
    width : 100%;
    height : 60%;
  }
  span {
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    
  }
`;

const StyledExplainPart = styled.div`
  display: flex;
`;