import React from 'react';
import logo from './logo.svg';
import './App.css';
import IntroPage from "./pages/IntroPage";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UniversalContainer from "./containers/universal/UniversalContainer";

function App() {
  return (
      <Router>
          <UniversalContainer>
              <Routes>
                  <Route path="/main" element={<IntroPage />} />
              </Routes>
          </UniversalContainer>
      </Router>
  );
}

export default App;
