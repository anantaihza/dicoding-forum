import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/app/store';
import App from './App';
import './assets/css/index.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        theme="colored"
        hideProgressBar={false}
        newestOnTop
        transition:Bounce
      />
      <App />
    </Provider>
  </React.StrictMode>
);
