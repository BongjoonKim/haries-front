import React, {useEffect} from 'react';
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
import {AuthProvider} from "./appConfig/AuthContext";

function App() {
  // function setScreenSize() {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }
  // useEffect(() => {
  //   setScreenSize();
  // });
  // 푸쉬 테스트
  // 푸쉬 테스트2
  return (
    <AuthProvider>
    <UniversalContainer>
      <Routes>
        <Route path="/*" element={<IntroPage />} />
        <Route path="/login/redirect/*" element={<RedirectLogin />} />
        <Route path="/example/*" element={RoutesTree.ExampleRoutes()} />
        <Route path="/frontEnd/*" element={<Front />} />
        <Route path="/blog/*" element={RoutesTree.BlogRoutes()} />
        <Route path="/chatgpt/*" element={RoutesTree.ChatGPTRoutes()} />
        <Route path="/admin/*" element={RoutesTree.AdminRoutes()} />
        <Route path="/dalle/*" element={RoutesTree.DalleRoutes()} />
      </Routes>
    </UniversalContainer>
    </AuthProvider>
  );
}

export default App;
