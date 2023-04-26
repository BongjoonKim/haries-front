import CreateContent from "../../../components/templates/WritingContents/Create";
import {useParams} from "react-router-dom";
import UpdateWriting from "../../../components/templates/WritingContents/Update";

function DocumentWritingPage() {
  const {id} = useParams();
  return (
    !!id ? (
      <CreateContent />
    ) : (
      <UpdateWriting />
    )
  )
}

export default DocumentWritingPage;