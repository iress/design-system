import { render } from '@testing-library/react';

import { HeadingWithDeprecatedFallback } from './HeadingWithDeprecatedFallback';
import { idsLogger } from '@helpers/utility/idsLogger';

describe('HeadingWithDeprecatedFallback', () => {
  it('renders nothing if no heading or headingText', () => {
    const screen = render(
      <HeadingWithDeprecatedFallback component="Component" />,
    );
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('renders heading with h2 tag if string', () => {
    const screen = render(
      <HeadingWithDeprecatedFallback component="Component" heading="heading" />,
    );
    expect(
      screen.getByRole('heading', { name: 'heading', level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders heading directly if a react element', () => {
    const screen = render(
      <HeadingWithDeprecatedFallback
        component="Component"
        heading={<h3>heading</h3>}
      />,
    );
    expect(
      screen.getByRole('heading', { name: 'heading', level: 3 }),
    ).toBeInTheDocument();
  });

  it('renders headingText with h2 tag by default, with deprecated warning', () => {
    const screen = render(
      <HeadingWithDeprecatedFallback
        component="Component"
        headingText="heading"
      />,
    );
    expect(
      screen.getByRole('heading', { name: 'heading', level: 2 }),
    ).toBeInTheDocument();
    expect(idsLogger).toHaveBeenCalledWith(
      `Component: 'headingLevel' and 'headingText' are deprecated and will be removed in a future version. Please use the new 'heading' prop instead.`,
    );
  });

  it('renders headingText with specified tag, with deprecated warning', () => {
    const screen = render(
      <HeadingWithDeprecatedFallback
        component="Component"
        headingText="heading"
        HeadingTag="h3"
      />,
    );
    expect(
      screen.getByRole('heading', { name: 'heading', level: 3 }),
    ).toBeInTheDocument();
    expect(idsLogger).toHaveBeenCalledWith(
      `Component: 'headingLevel' and 'headingText' are deprecated and will be removed in a future version. Please use the new 'heading' prop instead.`,
    );
  });

  it('renders with data-testid', () => {
    const screen = render(
      <HeadingWithDeprecatedFallback
        component="Component"
        heading="heading"
        data-testid="test-id"
      />,
    );
    expect(screen.getByTestId('test-id')).toBeInTheDocument();
  });
});
