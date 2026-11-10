import React from 'react';
import ReactDOM from 'react-dom/client';
import { cssVars } from '@iress-oss/ids-tokens';

const App = () => {
  return (
    <div
      style={{
        padding: cssVars.spacing['1'],
        color: cssVars.colour.primary.text,
      }}
    >
      Coloured text
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
