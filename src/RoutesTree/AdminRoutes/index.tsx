import {Routes, Route} from "react-router-dom";
import React from "react";
import CreateFolder from "../../pages/admin/folder/CreateFolder";
import MainAdmin from "../../pages/admin/layout/MainAdmin";


function AdminRoutes() {
  return (
    <MainAdmin>
    <Routes>
      
        <Route path="/" element={<CreateFolder />} />
    </Routes>
    </MainAdmin>

  )
}

export default AdminRoutes;