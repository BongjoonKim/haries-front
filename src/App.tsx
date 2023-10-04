import React from 'react';
import './App.css';
import IntroPage from "./pages/IntroPage";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import UniversalContainer from "./containers/universal/UniversalContainer";
import Front from "./pages/Front";
import RoutesTree from "./RoutesTree";
import ExampleThree from "./pages/examples/ExampleThree";
import ExampleOne from "./pages/examples/ExampleOne";
import RedirectLogin from "./pages/Login/RedirectLogin";
import ChatGPTRoutes from "./RoutesTree/ChatGPTRoutes";

function App() {
  return (
    <UniversalContainer>
      <Routes>
        <Route path="/*" element={<IntroPage />} />
        <Route path="/login/redirect/*" element={<RedirectLogin />} />
        <Route path="/example/*" element={RoutesTree.ExampleRoutes()} />
        <Route path="/frontEnd/*" element={<Front />} />
        <Route path="/blog/*" element={RoutesTree.BlogRoutes()} />
        <Route path="/chatgpt/*" element={RoutesTree.ChatGPTRoutes()} />
        <Route path="/admin/*" element={RoutesTree.AdminRoutes()} />
      </Routes>
    </UniversalContainer>
  );
}

export default App;
