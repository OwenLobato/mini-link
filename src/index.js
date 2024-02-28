import React from 'react';
import ReactDOM from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App';
import './styles/index.css';

if (process.env.REACT_APP_NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
