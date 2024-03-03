import styled from "styled-components";
import WritingContext from "../../../components/templates/WritingContext";
import Sidebar from "../../../containers/global/Sidebar";

function DocumentListPage() {
  return (
    <StyledDocumentList>
      <Sidebar isCollapsed={false} />
      <WritingContext />
    </StyledDocumentList>
    
  )
}

export default DocumentListPage;

const StyledDocumentList = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: center;
  width : 100%;
  max-width: 1600px;
`;