import { createPortal } from 'react-dom';
import { SandboxIconFont } from '../components/SandboxIconFont';

export const createSandboxIconFontPortal = () =>
  createPortal(<SandboxIconFont />, document.head, 'sandbox-icon-font');
