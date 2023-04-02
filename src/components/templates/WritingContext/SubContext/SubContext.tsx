import styled from "styled-components";
import moment from "moment";
import {SubContextProps} from "../types";

function SubContext(props : SubContextProps) {
  return (
    <StyledSubContext>
      <img />
      <h4>
        {props.titles}
      </h4>
      <h6>
        {props.contents}
      </h6>
      <h6>
        {moment(props.modified).format("YYYY-MM-DD")}
      </h6>
    </StyledSubContext>
  )
}

export default SubContext;

const StyledSubContext = styled.div`
  display: inline-block;
  justify-content: space-between;
`;

const StyledExplainPart = styled.div`
  display: flex;
`;