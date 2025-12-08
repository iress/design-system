import React from 'react';
import { ADDON_ICON } from '../constants';
import { createPortal } from 'react-dom';

const SandboxIconFont = () => (
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />

    <style>{`
  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
  }`}</style>
  </>
);

export const SandboxIcon = () => (
  <>
    <span
      className="material-symbols-outlined"
      style={{ fontSize: '1.4em' }}
      aria-hidden="true"
    >
      {ADDON_ICON}
    </span>
    {createPortal(<SandboxIconFont />, document.head, 'sandbox-icon-font')}
  </>
);
