import React from 'react';
import { SandboxButton } from '../SandboxButton';
import { Button } from 'storybook/internal/components';
import { toggle } from 'radash';
import { useCallback, useRef } from 'react';

interface SandboxScopesProps {
  availableScopes?: string[];
  onChange?: (scopes: string[]) => void;
  scopes?: string[];
}

export const SandboxScopes = ({
  availableScopes = [],
  onChange,
  scopes = [],
}: SandboxScopesProps) => {
  const dialog = useRef<HTMLDialogElement | null>(null);

  const toggleScope = useCallback(
    (scope: string) => {
      onChange?.(toggle(scopes, scope));
    },
    [onChange, scopes],
  );

  if (!availableScopes.length) {
    return null;
  }

  return (
    <>
      <SandboxButton
        label="Scopes"
        aria-label="Scopes"
        icon="apps"
        onClick={() => dialog.current?.showModal()}
      />
      <dialog ref={dialog} className="sandbox-dialog" data-testid="dialog">
        <Button
          variant="ghost"
          onClick={() => dialog.current?.close()}
          className="close"
        >
          <span className="material-symbols-outlined">close</span>
        </Button>
        <h2>Scopes</h2>
        <p>
          Select scope(s) to use in the sandbox. Scopes are used to allow your
          code to access additional libraries.
        </p>
        <ul>
          {availableScopes.map((scope) => (
            <li key={scope}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => toggleScope(scope)}
                  checked={scopes.includes(scope)}
                  disabled={scope === 'default'}
                />{' '}
                {scope}
              </label>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
};
