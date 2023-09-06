import useWritingContents from "../useWritingContents";
import React, {lazy, Suspense, useRef} from "react";
// import Editor from "../../../widgets/Editor";
import WritingContentsLayout from "../WritingContentsLayout";
import useEditorWriting from "../useEditorWriting";

function UpdateWriting() {
  const {
    editorRef, onUploadImage,
    writing, handleSave,
    addTag, tags, setTags, tagInput, setTagInput,
    tagDelete, getDocumentData,
    addFiles, handleOutPage,
    selectedFolderId, writeTag,
    setSelectedFolderId
  } = useEditorWriting();
  const Editor = lazy(() => import("../../../widgets/Editor"));
  const WritingContentsLayout = lazy(() => import("../WritingContentsLayout"));
  
  // const ref = {titleRef, editorRef};
  
  return (
    <Suspense>
      <WritingContentsLayout
        editorRef={editorRef}
        title={writing.title}
        save={handleSave}
        addTag = {addTag}
        tags={tags}
        tagInput={tagInput}
        setTagInput={setTagInput}
        tagDelete={tagDelete}
        getDocumentData={getDocumentData}
        addFiles={addFiles}
        handleOutPage={handleOutPage}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
        writeTag={writeTag}
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