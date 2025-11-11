import { ADDON_ICON, ADDON_TITLE_SHORT } from '../constants';
import { createSandboxIconFontPortal } from '../helpers';

export interface SandboxLabelProps {
  title?: string;
}

export const SandboxLabel = ({
  title = ADDON_TITLE_SHORT,
}: SandboxLabelProps) => {
  return (
    <>
      <span
        className="material-symbols-outlined"
        style={{ fontSize: '1.5em', paddingRight: '.125em' }}
        aria-hidden="true"
      >
        {ADDON_ICON}
      </span>{' '}
      {title}
      {createSandboxIconFontPortal()}
    </>
  );
};
