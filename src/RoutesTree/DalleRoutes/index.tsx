import {Route, Routes} from "react-router-dom";
import React from "react";
import ChattingPage from "../../pages/chatgpt/ChattingPage";
import DallePage from "../../pages/dalle/DallePage";

function DalleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DallePage />} />
    </Routes>
  )
}

export default DalleRoutes;