import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import swDev from './swDev.js';
import HttpsRedirect from 'react-https-redirect';

ReactDOM.render(
  // <React.StrictMode>
    <HttpsRedirect>
      <App />
    </HttpsRedirect>,
  // </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
swDev();
