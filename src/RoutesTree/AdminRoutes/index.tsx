import {Routes, Route} from "react-router-dom";
import React from "react";
import CreateFolder from "../../pages/admin/folder/CreateFolder";


function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreateFolder />} />
    </Routes>
  )
}

export default AdminRoutes;