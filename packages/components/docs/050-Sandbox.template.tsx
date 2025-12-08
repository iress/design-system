import React from 'react';
import ReactDOM from 'react-dom/client';
import { IressPanel, IressProvider } from '@iress-oss/ids-components';
import '@iress-oss/ids-components/dist/style.css';
import { createPortal } from 'react-dom';

const App = () => {
  return <IressPanel bg="alt">Iress Design System Panel</IressPanel>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IressProvider>
      {createPortal(
        <link
          rel="stylesheet"
          href="https://cdn.iress.com/ids/5.7.0/themes/css/iress-beta-theme-light.css"
        />,
        document.head,
      )}
      <App />
    </IressProvider>
  </React.StrictMode>,
);

document.body.classList.add('iress-beta-theme-light');
