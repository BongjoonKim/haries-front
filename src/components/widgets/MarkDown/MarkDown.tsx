import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import styled from "styled-components";


interface MarkdownProps {
  contents : any;
}

function MarkDown(props : MarkdownProps) {
  return (
      <StyledReactMarkdown
        remarkPlugins={[remarkGfm]}
        children={props.contents}
        // rehypePlugins={[rehypeHighlight]}
        components={{
          code({node, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || "");
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      />
  )
}

export default MarkDown;

const StyledReactMarkdown = styled(ReactMarkdown)`
  pre {
    background: rgb(60 59 59);
    padding: 1rem;
    border-radius: 10px;
    color: snow;
  }
`