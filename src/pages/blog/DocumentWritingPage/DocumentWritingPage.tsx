import CreateContent from "../../../components/templates/WritingContents/Create";
import {useParams} from "react-router-dom";
import UpdateWriting from "../../../components/templates/WritingContents/Update";

function DocumentWritingPage() {
  const {id} = useParams();
  return (
    !!id ? (
      // 수정 화면
      <UpdateWriting />
    ) : (
      // 글 작성 화면
      <CreateContent />
      
    )
  )
}

export default DocumentWritingPage;