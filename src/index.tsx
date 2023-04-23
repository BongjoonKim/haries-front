import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import stores from "./stores/reduxThunk";
import {Provider} from "react-redux";
import {RecoilRoot} from "recoil";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={stores}>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
  </Provider>
);

