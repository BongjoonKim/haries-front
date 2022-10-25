import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from "./components/contents/MainPage/MainPage";
import Navbar from "./components/headMenu/Navbar";

function App() {
  return (
      <header>
          <Navbar />
        <MainPage />
      </header>
  );
}

export default App;
