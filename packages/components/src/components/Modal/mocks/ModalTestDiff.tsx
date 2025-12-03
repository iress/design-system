import { DiffViewer } from '@iress-oss/ids-storybook-config';

export const ModalTestDiff = () => (
  <DiffViewer
    allowModeChange
    oldValue={`import { render, waitFor, screen } from '@testing-library/react';
import { idsFireEvent, componentLoad } from '@iress/ids-react-test-utils';
  
test('opening and closing a modal', async () => {
  await componentLoad([
    'modal-trigger',
    'modal',
  ]);

  const trigger = screen.getByTestId('modal-trigger');
  const modal = screen.getByTestId('modal');

  // In version 4, you can already interact with the modal here as its in the DOM at this stage.

  // activate modal
  idsFireEvent.click(trigger);
  await waitFor(() => expect(modal).toBeVisible());

  // close modal
  const closeButton = screen.getByTestId('modal__close-button');
  idsFireEvent.click(closeButton);
  await waitFor(() => expect(modal).not.toBeVisible());
});`}
    newValue={`import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

test('opening and closing a modal', async () => {
  const trigger = screen.getByRole('button', { name: /open modal/i });

  // activate modal
  await userEvent.click(trigger);
  const modal = await screen.findByRole('dialog');

  // In version 5, you can only interact with the modal once it has been loaded here.

  // close modal
  const closeButton = screen.getByRole('button', { name: /close/i });
  await userEvent.click(closeButton);
  await waitForElementToBeRemoved(modal);
});`}
  />
);
