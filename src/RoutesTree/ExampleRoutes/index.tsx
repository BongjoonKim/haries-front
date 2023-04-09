import {Route, Routes, BrowserRouter} from "react-router-dom";
import ExampleOne from "../../pages/examples/ExampleOne";
import ExampleTwo from "../../pages/examples/ExampleTwo";
import ExampleThree from "../../pages/examples/ExampleThree";

function ExampleRoutes() {
  return (
    <Routes>
      <Route path="/" element={ExampleOne()} />
      <Route path="/example-two" element={ExampleTwo()} />
      <Route path="/example-three" element={ExampleThree()} />
    </Routes>
  )
}

export default ExampleRoutes