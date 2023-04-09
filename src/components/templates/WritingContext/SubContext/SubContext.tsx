import styled from "styled-components";
import moment from "moment";

interface SubContextProps {
  data : DocumentsDTO[];
}

function SubContext(props: SubContextProps) {
  console.log("글 목록 보기", props.data);
  const writings = props.data;
  return (
    <>
      {writings.map(writing => (
        <StyledSubContext>
          <img />
          <h4>
            {writing.titles}
          </h4>
          <h6>
            {writing.htmlContents}
          </h6>
          <h6>
            {moment(writing.created).format("YYYY-MM-DD")}
          </h6>
        </StyledSubContext>
      ))}
    </>
    
  )
}

export default SubContext;

const StyledSubContext = styled.div`
  display: inline-block;
  justify-content: space-between;
  border: 1px solid #cfd2d4;
`;

const StyledExplainPart = styled.div`
  display: flex;
`;