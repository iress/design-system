import React from 'react';
import ReactDOM from 'react-dom/client';
import { IressPanel, IressProvider } from '@iress-oss/ids-components';
import '@iress-oss/ids-components/dist/style.css';

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  return <IressPanel bg="alt">Iress Design System Panel</IressPanel>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IressProvider>
      <App />
    </IressProvider>
  </React.StrictMode>,
);
