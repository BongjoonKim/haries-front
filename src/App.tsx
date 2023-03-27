import React from 'react';
import './App.css';
import IntroPage from "./pages/IntroPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UniversalContainer from "./containers/universal/UniversalContainer";
import Examples from "./pages/examples/ExampleOne";
import Front from "./pages/Front";

function App() {
  return (
      <Router>
          <UniversalContainer>
            <Routes>
              <Route path="/*" element={<IntroPage />} />
              <Route path="/example/*" element={<Examples />} />
              <Route path="/frontEnd/*" element={<Front />} />
            </Routes>
          </ UniversalContainer>
      </Router>
  );
}

export default App;
