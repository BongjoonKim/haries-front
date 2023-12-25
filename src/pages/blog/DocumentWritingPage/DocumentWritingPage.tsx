import CreateWriting from "../../../components/templates/WritingContents/Create";
import {useParams} from "react-router-dom";
// import UpdateWriting from "../../../components/templates/WritingContents/Update";
import {lazy, Suspense} from "react";

const UpdateWriting = lazy(() => import("../../../components/templates/WritingContents/Update"));

function DocumentWritingPage() {
  const {id} = useParams();
  
  return (
    !!id ? (
      <Suspense>
        <UpdateWriting />
      </Suspense>
    ) : (
      // 글 작성 화면
      <CreateWriting />
      
    )
  )
}

export default DocumentWritingPage;