import { RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { SelectReadonly, SelectReadonlyProps } from './SelectReadonly';

const TEST_ID = 'test-component';
const NAME = 'test-component';

function renderComponent(
  {
    children = [
      <option value="1" key="1">
        Option 1
      </option>,
      <option value="2" key="2">
        Option 2
      </option>,
      <option value="3" key="3">
        Option 3
      </option>,
    ],
    ...props
  }: Omit<SelectReadonlyProps, 'name'> & { name?: string } = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <SelectReadonly {...props} name={props.name ?? NAME} data-testid={TEST_ID}>
      {children}
    </SelectReadonly>,
  );
}

describe('SelectReadonly', () => {
  it('renders the component with the correct classes and test ids', () => {
    const screen = renderComponent({
      className: 'test-class',
      style: { color: 'red' },
    });

    const readonly = screen.getByTestId(`${TEST_ID}__pseudo`);
    expect(readonly).toHaveClass('test-class');
    expect(readonly).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  describe('props', () => {
    describe('readonly', () => {
      it('hidden input has correct value', () => {
        const screen = renderComponent({
          value: '2',
        });

        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByDisplayValue('2')).toBeInTheDocument();
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
