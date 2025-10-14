import { RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSelectOptionProps } from '..';
import { IressSelectOption } from './SelectOption';

const TEST_ID = 'test-component';

function renderComponent(
  {
    'data-testid': dataTestId = TEST_ID,
    ...props
  }: Omit<IressSelectOptionProps, 'name'> & { name?: string } = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(<IressSelectOption {...props} data-testid={dataTestId} />);
}

describe('IressSelectOption', () => {
  it('renders the component with the correct classes and test ids', () => {
    const screen = renderComponent({
      className: 'test-class',
    });

    expect(screen.getByTestId(TEST_ID)).toHaveClass('test-class');
  });

  describe('props', () => {
    describe('value', () => {
      it('converts value to string when in the dom', () => {
        const screen = renderComponent({
          children: 'Option 2',
          value: true,
        });

        const option = screen.getByText('Option 2') as HTMLOptionElement;

        expect(option).toBeInTheDocument();
        expect(option.value).toBe('true');
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderComponent();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
