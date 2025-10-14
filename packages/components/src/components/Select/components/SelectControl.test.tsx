import { RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { GlobalCSSClass } from '@/enums';
import { SelectControl, SelectControlProps } from './SelectControl';
import { select } from '../Select.styles';

const TEST_ID = 'test-component';

function renderComponent(
  {
    'data-testid': dataTestId = TEST_ID,
    ...props
  }: Omit<SelectControlProps, 'name'> & { name?: string } = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(<SelectControl {...props} data-testid={dataTestId} />);
}

describe('SelectControl', () => {
  it('renders the component with the correct classes and test ids', () => {
    const screen = renderComponent({
      className: 'test-class',
    });

    const combobox = screen.getByRole('combobox');

    expect(combobox).toHaveClass('test-class', select().element!);
    expect(combobox.parentElement).toHaveClass(
      select().control!,
      GlobalCSSClass.FormElementInner,
    );
  });

  describe('props', () => {
    describe('placeholder', () => {
      it('adds an empty option as a placeholder', () => {
        const screen = renderComponent({
          placeholder: 'Select an option',
        });

        expect(screen.getByText('Select an option')).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <>
          <label htmlFor="select">Test</label>
          <SelectControl id="select" placeholder="Select an option" />,
        </>,
      );

      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
