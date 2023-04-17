import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useEffect, useRef, useState} from "react";

interface EditorViewProps {
  writing : string | undefined;
  viewerRef : any;
}

function EditorViewer(props : EditorViewProps) {
  
  return (
    <>
      <Viewer ref={props.viewerRef} />
      <ReactMarkdown children={props.writing!} remarkPlugins={[remarkGfm]}/>
    </>

  );
}

export default EditorViewer;