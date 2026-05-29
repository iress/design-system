import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router';
import { IressProvider } from '@iress-oss/ids-components';
import { MDXProvider } from '@mdx-js/react';
import { routeTree } from './routeTree.gen';
import { useMDXComponents } from './mdx-components';
import '@iress-oss/ids-components/dist/style.css';
import './code-highlight.css';

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
      <MDXProvider components={useMDXComponents()}>
        <RouterProvider router={router} />
      </MDXProvider>
    </IressProvider>
  </StrictMode>,
);
