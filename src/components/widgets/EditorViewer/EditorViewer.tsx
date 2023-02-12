import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

function EditorViewer(contents : string | undefined) {
  return <Viewer initialValue={contents || ''} />;
}

export default EditorViewer;