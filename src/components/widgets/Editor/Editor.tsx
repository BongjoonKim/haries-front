import { Editor as ToastUi } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/i18n/ko-kr';
import {EditorType} from "@toast-ui/editor";
import {lazy, useEffect} from "react";

export interface EditorProps{
  initialEditType : EditorType;
  initialValue?: string;
  editorRef: any;
  hooks: any;
  
}

// const colorSyntax = lazy(() => import("@toast-ui/editor-plugin-color-syntax"))

function Editor(props: EditorProps) {
  useEffect(() => {
    document.querySelectorAll('input').forEach(input => {
      input.setAttribute('autocomplete', 'off');
    });
  }, [])
  
  console.log("colorSyntax", colorSyntax)
  
  // 커스텀 하기
  return (
    <ToastUi
      initialValue={props?.initialValue || ""}
      initialEditType={props.initialEditType || "markdown"}
      plugins={[colorSyntax]}
      // hideModeSwitch={true}
      previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'}
      // useCommandShortcut={true}
      ref={props.editorRef}
      language="ko-KR"
      hooks={props.hooks}
    />
  )
}

export default Editor;