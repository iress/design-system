import React from 'react';
import ReactDOM from 'react-dom/client';
import { IressProvider } from '@iress-oss/ids-components';
import '@iress-oss/ids-components/dist/style.css';

const App = () => {
  return <Story />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IressProvider>
      <App />
    </IressProvider>
  </React.StrictMode>,
);
