import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app';
import { store } from './app/state/store';
import { Provider } from 'react-redux';
import './i18n';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const container = document.getElementById('root');
const root = createRoot(container!); 

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        />
      <App />
    </Provider>
  </React.StrictMode>
);
