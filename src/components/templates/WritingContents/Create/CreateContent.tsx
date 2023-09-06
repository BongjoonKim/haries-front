import useWritingContents from "../useWritingContents";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Button from "../../../elements/Button";
import styled from "styled-components";
import Editor from "../../../widgets/Editor";
import {StyledEditor, StyledEditorButton, StyledLeftEditorButton, StyledRightEditorButton} from "../WritingStyle";
import WritingContentsLayout from "../WritingContentsLayout";
import {useRef} from "react";
import useEditorWriting from "../useEditorWriting";

function CreateContent() {
  
  const {
    editorRef, writing, onUploadImage,
    handleSave, addTag,
    tags, tagInput, setTagInput, tagDelete,
    addFiles, handleOutPage, writeTag,
    selectedFolderId,
    setSelectedFolderId,
  } = useEditorWriting();
  
  return (
    <WritingContentsLayout
      editorRef={editorRef}
      title={writing.title}
      save={handleSave}
      addTag = {addTag}
      tags={tags}
      tagInput={tagInput}
      setTagInput={setTagInput}
      tagDelete={tagDelete}
      addFiles={addFiles}
      handleOutPage={handleOutPage}
      selectedFolderId={selectedFolderId}
      setSelectedFolderId={setSelectedFolderId}
      writeTag={writeTag}
    >
      <Editor
        editorRef={editorRef}
        initialEditType={writing.contentsType!}
        hooks={{
          addImageBlobHook: onUploadImage
        }}
      />
    </WritingContentsLayout>
  )
}

export default CreateContent;