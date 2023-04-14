import {Routes, Route} from "react-router-dom";
import React from "react";
import DocumentListPage from "../../pages/blog/DocumentListPage";

function BlogRoutes() {
  return (
    <Routes>
      <Route path="*" element={<DocumentListPage />} />
    </Routes>
  )
}

export default BlogRoutes;