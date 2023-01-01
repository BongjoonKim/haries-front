import React from 'react';
import './App.css';
import IntroPage from "./pages/IntroPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UniversalContainer from "./containers/universal/UniversalContainer";
import Examples from "./pages/examples";

function App() {
  return (
      <Router>
          <UniversalContainer>
                  <Routes>
                      <Route path="/" element={<IntroPage />} />
                      <Route path="/introduce" element={<Examples />} />
                  </Routes>
              {/*<IntroPage />*/}
          </ UniversalContainer>
      </Router>
  );
}

export default App;
