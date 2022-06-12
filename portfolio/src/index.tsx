import React from 'react';
import ReactDOM from 'react-dom/client';
import bemCssModules from 'bem-css-modules';

import 'normalize.css';
import './index.sass';

import App from './App';

bemCssModules.setSettings({ modifierDelimiter: '--' })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
