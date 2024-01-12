import MainContent from "../../../../components/templates/MainContent/MainContent";
import CustomButton from "../../../../components/elements/Button";
import FolderTree from "../../../../components/modules/FolderTree";
import styled from "styled-components";
import useFolder from "./useFolder";

function CreateFolder() {
  const {
    createFolder,
    update,
    setUpdate
  } = useFolder();
  
  return (
    <StyledMainContents>
      <MainContent
        title="Folder Setting"
        style={{
          margin : "1rem 1rem"
        }}
        header={
          <CustomButton onClick={createFolder}>
            폴더 생성
          </CustomButton>
        }
      >
        <FolderTree
          show={true}
          update={update}
          setUpdate={setUpdate}
        />
      </MainContent>
    </StyledMainContents>
  )
}

export default CreateFolder;

const StyledMainContents = styled.div`
  margin : 1rem 1rem;
`;