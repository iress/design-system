import { render, screen } from '@testing-library/react';
import { TabsWithPassedState } from './TabsWithPassedState';
import userEvent from '@testing-library/user-event';

describe('TabsWithPassedState', () => {
  it('should update the contents of the tab, when it has been updated outside the tabset', async () => {
    render(<TabsWithPassedState />);

    const submit = await screen.findByRole('button', { name: 'Submit' });

    await userEvent.click(submit);

    expect(submit).toHaveTextContent('Loading...');
  });
});
