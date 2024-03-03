import styled from "styled-components";
import moment from "moment";
import {createElement} from "react";
import useSubContext from "./useSubContext";
import {DocumentDTO} from "../../../../types/dto/documentsInfo";
import {random} from "lodash";

interface SubContextProps {
  data : DocumentDTO[];
}

function SubContext(props: SubContextProps) {
  console.log("글 목록 보기", props.data);
  const writings = props.data;
  const { contentsOnClick, imgUrl, thumbnailColor } = useSubContext(writings);
  
  // imgUrl.find((el : any) => el.id === )?.key
  
  console.log("imgUrl", thumbnailColor[random(thumbnailColor.length-1)])
  return (
    <StyledSubContext>
      {writings.map((writing, index) => {
        let parser = new DOMParser();
        let documents = parser.parseFromString(writing.contents!, "text/html");
        return (
        <StyledContextBox key={index} id={writing.id} onClick={contentsOnClick}>
          {imgUrl.filter((el : any) => el.id === writing.id)?.[0]?.key !== "none"
             ? (
              <img
                className='thumbnail'
                src={
                  `${process.env.REACT_APP_S3_URI}/${imgUrl.filter((el : any) => el.id === writing.id)?.[0]?.key}`
                }
              />
            ) : (
              <div
                className="thumbnail"
              >
                <div
                  className="none"
                  style={{
                    opacity: 0.7,
                    backgroundColor : thumbnailColor[random(thumbnailColor.length-1)]
                  }}
                />
              </div>
            )
          }
          <div className="info">
            <div className="info-top">
              <h4>
                {writing.title}
              </h4>
              <span>
                {documents?.body?.innerText}
              </span>
            </div>
            <div className="info-bottom">
              <h6>
                {moment(writing.created).format("YYYY-MM-DD")}
              </h6>
            </div>
          </div>
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
  display: flex;
  flex-direction: column;
  &:hover {
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    -webkit-transition: margin 0.5s ease-out;
    -moz-transition: margin 0.5s ease-out;
    -o-transition: margin 0.5s ease-out;
    padding-top: -5px;
    cursor:pointer;
  }
  .thumbnail {
    width : 100%;
    height : 12rem;
    .none {
      width: 100%;
      height: inherit;
    }
  }
  .info {
    padding: 0.5rem 0.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    span {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

const StyledExplainPart = styled.div`
  display: flex;
`;