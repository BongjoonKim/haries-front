import {Routes, Route} from "react-router-dom";
import React from "react";
import DocumentListPage from "../../pages/blog/DocumentListPage";
import DocumentViewerPage from "../../pages/blog/DocumentViewerPage";
import DocumentWritingPage from "../../pages/blog/DocumentWritingPage";

function BlogRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DocumentListPage />} />
      <Route path="/:id" element={<DocumentViewerPage />} />
      <Route path="/writing" element={<DocumentWritingPage />} />
      <Route path="/writing/:id" element={<DocumentWritingPage />} />
    </Routes>
  )
}

export default BlogRoutes;