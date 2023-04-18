import {MutableRefObject, useCallback, useEffect, useMemo, useRef} from "react";
import useEditor from "./useEditor";
import styled from "styled-components";
import Button from "../../elements/Button";
import { Editor as ToastUi } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export interface EditorProps{
  initialValue?: string;
  editorRef: any;
  hooks: any;
  
}

function Editor(props: EditorProps) {
  // 커스텀 하기
  return (
    <ToastUi
      initialValue=''
      initialEditType="markdown"
      plugins={[colorSyntax]}
      ref={props.editorRef}
      language="ko-KR"
      hooks={props.hooks}
    />
  )
}

export default Editor;