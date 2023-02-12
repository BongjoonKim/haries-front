import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkDown() {
  const data = " 테스트야!!"
  return (
    <>
      <ReactMarkdown children={data} remarkPlugins={[remarkGfm]} />
    </>
  )
}

export default MarkDown;