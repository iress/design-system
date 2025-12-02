import React from 'react';
import type { SandboxTemplate } from '../../types';
import iconSandboxSimple from './simple/icon-sandbox-simple';
import simpleSnippet from './simple/snippet.tsx?raw';

export const TEMPLATES: SandboxTemplate[] = [
  {
    title: 'Simple',
    description: (
      <p>A template that just has a panel and some text to begin with.</p>
    ),
    thumbnail: iconSandboxSimple(), // TODO: Not sure why </> JSX is not working here
    state: {
      code: simpleSnippet,
    },
  },
];
