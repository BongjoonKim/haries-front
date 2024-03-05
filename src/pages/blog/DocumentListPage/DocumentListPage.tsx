import styled from "styled-components";
import WritingContext from "../../../components/templates/WritingContext";
import Sidebar from "../../../containers/global/Sidebar";
import {useState} from "react";

function DocumentListPage() {
  const [selectedFolderId, setSelectedFolderId] = useState("");
  return (
    <StyledDocumentList>
      <Sidebar isCollapsed={false} folderId={selectedFolderId} setFolderId={setSelectedFolderId} />
      <WritingContext folderId={selectedFolderId} setFolderId={setSelectedFolderId}  />
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