import MainContent from "../../../../components/templates/MainContent/MainContent";
import CustomButton from "../../../../components/elements/Button";
import FolderTree from "../../../../components/modules/FolderTree";
import styled from "styled-components";

function CreateFolder() {
  return (
    <StyledMainContents>
      <MainContent
        title="Folder Setting"
        style={{
          margin : "1rem 1rem"
        }}
        header={
          <CustomButton>
            폴더 생성
          </CustomButton>
        }
      >
        <FolderTree show={true}/>
      </MainContent>
    </StyledMainContents>
  )
}

export default CreateFolder;

const StyledMainContents = styled.div`
  margin : 1rem 1rem;
`;