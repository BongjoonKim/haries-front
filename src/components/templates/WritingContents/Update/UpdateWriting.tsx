import React, {lazy, Suspense, useRef, useState} from "react";
import useEditorWriting from "../useEditorWriting";

const WritingContentsLayout = lazy(() => import("../WritingContentsLayout"));
const Editor = lazy(() => import("../../../widgets/Editor"));

function UpdateWriting() {
  const {
    editorRef, onUploadImage,
    writing, handleSave, titleRef,
    tags, setTags, tagInput, setTagInput,
    getDocumentData,
    addFiles, handleOutPage,
    selectedFolderId,
    setSelectedFolderId, id, attachments
  } = useEditorWriting();
  
  console.log("최종 writing", writing)

  
  return (
    <Suspense>
      {writing.id === id && (
        <WritingContentsLayout
          ref={titleRef}
          write={writing}
          save={handleSave}
          tags={tags}
          tagInput={tagInput}
          setTagInput={setTagInput}
          getDocumentData={getDocumentData}
          addFiles={addFiles}
          handleOutPage={handleOutPage}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
          attachments={attachments}
        >
          <Editor
            initialEditType={writing.contentsType!}
            initialValue={writing.contents!}
            editorRef={editorRef}
            hooks={{addImageBlobHook : onUploadImage}}
          />
        </WritingContentsLayout>
      )}
    </Suspense>
    
  )
  
}

export default UpdateWriting;