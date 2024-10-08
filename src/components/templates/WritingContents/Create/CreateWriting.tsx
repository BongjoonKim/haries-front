import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Button from "../../../elements/Button";
import styled from "styled-components";
import Editor from "../../../widgets/Editor";
import {StyledEditor, StyledEditorButton, StyledLeftEditorButton, StyledRightEditorButton} from "../WritingStyle";
import WritingContentsLayout from "../WritingContentsLayout";
import {useRef} from "react";
import useEditorWriting from "../useEditorWriting";

function CreateWriting() {
  
  const {
    editorRef, onUploadImage,
    writing, handleSave, titleRef,
    tags, setTags, tagInput, setTagInput,
    getDocumentData,
    addFiles, handleOutPage,
    selectedFolderId,
    setSelectedFolderId, id, attachments,
    handleDeleteFile
  } = useEditorWriting();
  
  return (
    <>
      {!writing?.id && (
        <WritingContentsLayout
          ref={titleRef}
          write={writing}
          save={handleSave}
          tags={tags}
          tagInput={tagInput}
          setTagInput={setTagInput}
          addFiles={addFiles}
          handleOutPage={handleOutPage}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
          attachments={attachments}
          handleDeleteFile={handleDeleteFile}
        >
          <Editor
            editorRef={editorRef}
            initialEditType={writing.contentsType!}
            hooks={{
              addImageBlobHook: onUploadImage
            }}
          />
        </WritingContentsLayout>
      )}
    </>
    
  )
}

export default CreateWriting;