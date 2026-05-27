import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router';
import { IressProvider } from '@iress-oss/ids-components';
import { routeTree } from './routeTree.gen';
import '@iress-oss/ids-components/dist/style.css';

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IressProvider>
      <RouterProvider router={router} />
    </IressProvider>
  </StrictMode>,
);
