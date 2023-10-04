import {Route, Routes} from "react-router-dom";
import DocumentListPage from "../../pages/blog/DocumentListPage";
import DocumentViewerPage from "../../pages/blog/DocumentViewerPage";
import DocumentWritingPage from "../../pages/blog/DocumentWritingPage";
import React from "react";
import ChattingPage from "../../pages/chatgpt/ChattingPage";

function ChatGPTRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChattingPage />} />
    </Routes>
  )
}

export default ChatGPTRoutes;