import MainContent from "../../../../components/templates/MainContent/MainContent";
import CustomButton from "../../../../components/elements/Button";
import FolderTree from "../../../../components/modules/FolderTree";

function CreateFolder() {
  return (
    <MainContent
      title="Create Folder"
    >
      <CustomButton>
        폴더 생성
      </CustomButton>
      <FolderTree />
    
    </MainContent>
  )
}

export default CreateFolder;