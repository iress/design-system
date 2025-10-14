import { render } from '@testing-library/react';
import { HomeLinkContent } from './HomeLinkContent';

describe('HomeLinkContent', () => {
  it('should render the logo from src if the logo is found', () => {
    const screen = render(
      <HomeLinkContent
        logoSrc="test/logo/src"
        logoFound={true}
        logoAltText="My Logo"
        onError={() => undefined}
      />,
    );

    const img = screen.getByAltText('My Logo');
    expect(img).toHaveAttribute('src', 'test/logo/src');
  });

  it('should render a home icon if the logo is not found', () => {
    const screen = render(
      <HomeLinkContent
        logoSrc="test/logo/src"
        logoFound={false}
        logoAltText="My Logo"
        onError={() => undefined}
      />,
    );

    const icon = screen.getByLabelText('My Logo');
    expect(icon).toHaveClass('fa-home');
  });
});
