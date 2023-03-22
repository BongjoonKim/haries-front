import {Route, Routes} from "react-router-dom";
import {BoardCreate} from "./Board";
import Test from "./Test/Test";
import Test2 from "./Test/Test2";

function FrontPage() {
  return (
    <Routes>
      <Route path="/" element={BoardCreate()} />
      <Route path="/test" element={Test()} />
      <Route path="/test/independent" element={Test2()} id="11"/>
    </Routes>
  )
}

export default FrontPage;