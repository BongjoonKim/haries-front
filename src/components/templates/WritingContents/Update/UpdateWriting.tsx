import useWritingContents from "../useWritingContents";
import React, {lazy, Suspense} from "react";
import Editor from "../../../widgets/Editor";
import WritingContentsLayout from "../WritingContentsLayout";

function UpdateWriting() {
  const {addFiles, editorRef, titleRef, handleSave, onUploadImage, writing } = useWritingContents();
  const Editor = lazy(() => import("../../../widgets/Editor"));
  const WritingContentsLayout = lazy(() => import("../WritingContentsLayout"));
  
  console.log("글 값", writing)
  return (
    <Suspense>
      <WritingContentsLayout
        titleRef={titleRef}
        addFiles={addFiles}
        handleSave={handleSave}
        titles={writing.titles}
      >

          <Editor
            initialEditType={writing.contentsType!}
            initialValue={writing.contents!}
            editorRef={editorRef}
            hooks={{addImageBlobHook : onUploadImage}}
          />
      </WritingContentsLayout>
    </Suspense>
    
  )
  
}

export default UpdateWriting;