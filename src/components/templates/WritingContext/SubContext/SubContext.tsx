import styled from "styled-components";

export interface SubContextProps {
  img : string;
  titles : string;
  contents : string;
  users : string;
  created : Date;
  modified : Date;
}

function SubContext(props : SubContextProps) {
  return (
    <StyledSubContext>
      <img />
      {props.titles}
      {props.contents}
      <StyledExplainPart>
        <h4>
          {props.users}

        </h4>
        {/*{props.modified}*/}
      </StyledExplainPart>
      
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