import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import stores from "./stores";
import {Provider} from "react-redux";
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={stores}>
          <RecoilRoot>
              <App />
          </RecoilRoot>
      </Provider>
  </React.StrictMode>
);

