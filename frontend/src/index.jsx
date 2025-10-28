import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ModalProvider } from './components/providers/ModalProvider';
import GlobalModalManager from './components/common/GlobalModalManager';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
      <GlobalModalManager />
    </ModalProvider>
  </React.StrictMode>
);
