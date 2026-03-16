import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { IressReadonlyProps } from './Readonly';
import { IressReadonly } from './Readonly';
import { GlobalCSSClass } from '@/enums';
import { readonly } from './Readonly.styles';

const renderReadonly = (props: IressReadonlyProps = {}) => {
  return render(<IressReadonly {...props} />);
};

describe('IressReadonly', () => {
  it('should render the component with the correct classes', () => {
    renderReadonly({
      className: 'test-class',
      'data-testid': 'test-component',
      value: 'Value',
    });

    const wrapper = screen.getByTestId('test-component');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass(
      'test-class',
      readonly().root!,
      GlobalCSSClass.Readonly,
    );

    const input = screen.getByText('Value');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(readonly().formControl!);
  });

  describe('props', () => {
    describe('actions', () => {
      it('renders action buttons when provided', () => {
        renderReadonly({
          actions: [
            { children: 'Action 1', onClick: vi.fn() },
            { children: 'Action 2', onClick: vi.fn() },
          ],
        });

        expect(screen.getByText('Action 1')).toBeInTheDocument();
        expect(screen.getByText('Action 2')).toBeInTheDocument();
      });

      it('calls onClick handler when an action button is clicked', async () => {
        const handleAction = vi.fn();
        renderReadonly({
          actions: [{ children: 'Action', onClick: handleAction }],
        });

        await userEvent.click(screen.getByText('Action'));
        expect(handleAction).toHaveBeenCalledTimes(1);
      });

      it('does not render action buttons when actions is not provided', () => {
        renderReadonly({ value: 'Value' });

        expect(screen.queryAllByRole('button')).toHaveLength(0);
      });

      it('renders actions with custom button props', () => {
        renderReadonly({
          actions: [
            {
              children: 'Custom Action',
              onClick: vi.fn(),
              'aria-label': 'Custom action button',
            },
          ],
        });

        const actionButton = screen.getByLabelText('Custom action button');
        expect(actionButton).toBeInTheDocument();
        expect(actionButton).toHaveTextContent('Custom Action');
      });
    });

    describe('append', () => {
      it('renders in append slot', () => {
        renderReadonly({
          append: 'Hello there',
        });

        const append = screen.getByText('Hello there');
        expect(append).toHaveClass(readonly().addon!);
      });
    });

    describe('children', () => {
      it('renders with children instead of value', () => {
        renderReadonly({
          children: 'Hello',
          value: 'World',
        });

        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.queryByText('World')).not.toBeInTheDocument();
      });
    });

    describe('loading', () => {
      it('renders a spinner', () => {
        renderReadonly({
          loading: true,
        });

        expect(screen.getByLabelText('loading')).toBeInTheDocument();
      });

      it('renders a spinner with custom loading text', () => {
        renderReadonly({
          loading: 'May the force be with you',
        });

        expect(
          screen.getByLabelText('May the force be with you'),
        ).toBeInTheDocument();
      });
    });

    describe('prepend', () => {
      it('renders in prepend slot', () => {
        renderReadonly({
          prepend: 'Hello there',
        });

        const prepend = screen.getByText('Hello there');
        expect(prepend).toHaveClass(readonly().addon!);
      });
    });

    describe('width', () => {
      it('adds the width class to the input when its not a percentage, so its not affected by prepend/append', () => {
        renderReadonly({
          width: '10',
          value: 'Value',
          'data-testid': 'test-input',
        });

        const wrapper = screen.getByTestId('test-input').firstChild;
        const input = screen.getByText('Value');

        expect(wrapper).toHaveClass(readonly({ width: '10' }).wrapper!);
        expect(input).toHaveClass(readonly({ width: '10' }).formControl!);
      });

      it('adds the width class to the wrapper when its a percentage', () => {
        renderReadonly({
          width: '25%',
          'data-testid': 'test-input',
          value: 'Value',
        });

        const wrapper = screen.getByTestId('test-input').firstChild;
        expect(wrapper).toHaveClass(readonly({ width: '25%' }).wrapper!);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderReadonly();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
