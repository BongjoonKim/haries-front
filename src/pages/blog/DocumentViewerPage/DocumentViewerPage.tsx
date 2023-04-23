import WritingViewer from "../../../components/templates/WritingViewer";
import {useRecoilState} from "recoil";
import {recoilDocumentState} from "../../../stores/recoil/recoilDocumentsState/recoilDocumentState";
import {useCallback, useEffect, useState} from "react";

function DocumentViewerPage() {
  
  return (
      <WritingViewer />
  )
}

export default DocumentViewerPage;