import {Routes, Route} from "react-router-dom";
import React from "react";
import DocumentListPage from "../../pages/blog/DocumentListPage";
import DocumentViewerPage from "../../pages/blog/DocumentViewerPage";

function BlogRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DocumentListPage />} />
      <Route path="/:id" element={<DocumentViewerPage />} />
    </Routes>
  )
}

export default BlogRoutes;