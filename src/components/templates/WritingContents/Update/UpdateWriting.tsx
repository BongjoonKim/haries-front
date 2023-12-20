import React, {lazy, Suspense, useRef, useState} from "react";
import useEditorWriting from "../useEditorWriting";

const Editor = lazy(() => import("../../../widgets/Editor"));
const WritingContentsLayout = lazy(() => import("../WritingContentsLayout"));

function UpdateWriting() {
  const {
    editorRef, onUploadImage,
    writing, handleSave, titleRef,
    tags, setTags, tagInput, setTagInput,
    getDocumentData,
    addFiles, handleOutPage,
    selectedFolderId,
    setSelectedFolderId
  } = useEditorWriting();
  

  
  return (
    <Suspense>
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