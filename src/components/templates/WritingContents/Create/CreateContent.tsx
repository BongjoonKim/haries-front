import useWritingContents from "../useWritingContents";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Button from "../../../elements/Button";
import styled from "styled-components";
import Editor from "../../../widgets/Editor";
import {StyledEditor, StyledEditorButton, StyledLeftEditorButton, StyledRightEditorButton} from "../WritingStyle";
import WritingContentsLayout from "../WritingContentsLayout";

function CreateContent() {
  
  const {addFiles, editorRef, titleRef, handleSave, onUploadImage, writing } = useWritingContents();
  
  return (
    <WritingContentsLayout titleRef={titleRef} addFiles={addFiles} handleSave={handleSave}>
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