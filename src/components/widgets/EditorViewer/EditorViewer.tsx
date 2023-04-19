import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useEffect, useRef, useState, Suspense} from "react";
import styled from "styled-components";

interface EditorViewProps {
  writing : string | undefined;
  viewerRef : any;
}

function EditorViewer(props : EditorViewProps) {
  console.log("최종", props.writing)
  
    return (
      (props.writing !== "") ? (
        <StyledViewer ref={props.viewerRef} initialValue={props.writing} />
      ) : (
        <></>
      )

    )
    

}

export default EditorViewer;

const StyledViewer = styled(Viewer)`
`;