import { SandboxButton } from '../SandboxButton';
import { Button } from 'storybook/internal/components';
import { type SandboxTemplate } from '../../types';
import { useCallback, useRef } from 'react';

interface SandboxTemplatesProps {
  onChange?: (template: SandboxTemplate) => void;
  templates?: SandboxTemplate[];
}

export const SandboxTemplates = ({
  onChange,
  templates,
}: SandboxTemplatesProps) => {
  const dialog = useRef<HTMLDialogElement | null>(null);

  const handleClick = useCallback(
    (template: SandboxTemplate) => {
      onChange?.(template);
      dialog.current?.close();
    },
    [onChange],
  );

  if (!templates?.length) {
    return null;
  }

  console.log(templates);

  return (
    <>
      <SandboxButton
        label="Templates"
        aria-label="Templates"
        icon="web"
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
        <h2>Templates</h2>
        <p>
          Here are a few templates that showcase the design system and give you
          a starting point to your prototype.
        </p>
        <ul className="sandbox-templates__items">
          {templates.map((template) => (
            <li key={template.title}>
              {template.thumbnail}
              <h3>{template.title}</h3>
              <div style={{ marginBlock: '0.5em' }}>{template.description}</div>
              <Button variant="outline" onClick={() => handleClick(template)}>
                Select
              </Button>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
};
