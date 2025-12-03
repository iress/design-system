import { DiffViewer } from '@iress-oss/ids-storybook-config';

export const SlideoutTestDiff = () => (
  <DiffViewer
    allowModeChange
    oldValue={`import { render, waitFor, screen } from '@testing-library/react';
import { idsFireEvent, componentLoad } from '@iress/ids-react-test-utils';
  
test('opening and closing a slideout', async () => {
  await componentLoad([
    'slideout-trigger',
    'slideout',
  ]);

  const trigger = screen.getByTestId('slideout-trigger');
  const slideout = screen.getByTestId('slideout');

  // In version 4, you can already interact with the slideout here as its in the DOM at this stage.

  // activate slideout
  idsFireEvent.click(trigger);
  await waitFor(() => expect(slideout).toBeVisible());

  // close slideout
  const closeButton = screen.getByTestId('slideout__close-button');
  idsFireEvent.click(closeButton);
  await waitFor(() => expect(slideout).not.toBeVisible());
});`}
    newValue={`import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

test('opening and closing a slideout', async () => {
  const trigger = screen.getByRole('button', { name: /open slideout/i });

  // activate slideout
  await userEvent.click(trigger);
  const slideout = await screen.findByRole('complementary'); // this assumes the slideout has the role="complementary"

  // In version 5, you can only interact with the slideout once it has been loaded here.

  // close slideout
  const closeButton = screen.getByRole('button', { name: /close/i });
  await userEvent.click(closeButton);
  await waitForElementToBeRemoved(slideout);
});`}
  />
);
