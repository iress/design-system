import { DiffViewer } from '@iress-oss/ids-storybook-config';

export const V5TestDiff = () => (
  <DiffViewer
    allowModeChange
    oldValue={`import { render } from '@testing-library/react';
import { idsFireEvent } from '@iress/ids-react-test-utils';
  
test('login form', async () => {
    const loginMock = jest.fn();
    const screen = render(<LoginForm loginUser={loginMock}/>);

    const usernameInput = await screen.findByTestId('username__input');
    const passwordInput = await screen.findByTestId('password__input');
    const submitBtn = await screen.findByTestId('submit-btn__button');

    idsFireEvent.change(usernameInput, { target: { value: 'joe.bloggs' }});
    idsFireEvent.change(passwordInput, { target: { value: '1234' }});
    idsFireEvent.click(submitBtn);

    expect(loginMock).toHaveBeenCalledWith("joe.bloggs", "1234");
});`}
    newValue={`import { render, fireEvent } from '@testing-library/react';

test('login form', () => {
    const loginMock = jest.fn();
    const screen = render(<LoginForm loginUser={loginMock}/>);

    const usernameInput = screen.getByRole('textbox', { name: 'Username' });
    const passwordInput = screen.getByRole('textbox', { name: 'Password' });
    const submitBtn = screen.getByRole('button');

    fireEvent.change(usernameInput, { target: { value: 'joe.bloggs' }});
    fireEvent.change(passwordInput, { target: { value: '1234' }});
    fireEvent.click(submitBtn);

    expect(loginMock).toHaveBeenCalledWith("joe.bloggs", "1234");
});`}
  />
);
