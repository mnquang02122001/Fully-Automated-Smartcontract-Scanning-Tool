import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/custom_bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './views/App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
