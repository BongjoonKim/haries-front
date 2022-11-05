import React from 'react';
import './App.css';
import IntroPage from "./pages/IntroPage";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UniversalContainer from "./containers/universal/UniversalContainer";

function App() {
  return (
      <Router>
          <UniversalContainer>
              <Routes>
                  <Route path="/" element={<IntroPage />} />
              </Routes>
          </ UniversalContainer>
      </Router>
  );
}

export default App;
