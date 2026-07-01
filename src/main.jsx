/**
 * Project init — React entry point
 *
 * Mounts the root component, global styles, and Toast container.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position="bottom-right" autoClose={3000} />
  </StrictMode>,
);
