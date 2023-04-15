import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

interface EditorViewProps {
  contents : string | undefined;
}

function EditorViewer(props : EditorViewProps) {
  return <Viewer initialValue={props.contents || ''} />;
}

export default EditorViewer;