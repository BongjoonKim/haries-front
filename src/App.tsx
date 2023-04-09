import React from 'react';
import './App.css';
import IntroPage from "./pages/IntroPage";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import UniversalContainer from "./containers/universal/UniversalContainer";
import Front from "./pages/Front";
import RoutesTree from "./RoutesTree";
import ExampleThree from "./pages/examples/ExampleThree";
import ExampleOne from "./pages/examples/ExampleOne";

function App() {
  return (
    <UniversalContainer>
      <Routes>
        <Route path="/*" element={<IntroPage />} />
        <Route path="/example/*" element={RoutesTree.ExampleRoutes()} />
        <Route path="/frontEnd/*" element={<Front />} />
      </Routes>
    </UniversalContainer>
  );
}

export default App;
