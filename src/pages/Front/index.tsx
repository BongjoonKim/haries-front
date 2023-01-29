import {Route, Routes} from "react-router-dom";
import {BoardCreate} from "./Board";

function FrontPage() {
  return (
    <Routes>
      <Route path="/" element={BoardCreate()} />
    </Routes>
  )
}

export default FrontPage;