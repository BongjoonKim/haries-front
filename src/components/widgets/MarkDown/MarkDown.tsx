import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'


interface MarkdownProps {
  contents : any;
}

function MarkDown(props : MarkdownProps) {
  return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        children={props.contents}
        rehypePlugins={[rehypeHighlight]}
      />
  )
}

export default MarkDown;