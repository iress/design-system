import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressToast } from './Toast';
import { type IressToastProps } from './Toast.types';
import { IressText } from '../../Text';
import { IressButton } from '../../Button';

const defaultProps: IressToastProps = {
  status: 'info',
  content: 'Content',
};

const renderComponent = (props?: Partial<IressToastProps>) => {
  return render(<IressToast {...defaultProps} {...props} />);
};

describe('IressToast', () => {
  describe('Default rendering', () => {
    it('should render the component content and info status', () => {
      const { getByText, getByRole } = renderComponent({
        heading: 'headingText',
      });

      const icon = getByRole('img', { name: 'info:' });
      expect(icon).toHaveClass('fa-info-square');

      const content = getByText(/Content/);
      expect(content).toBeInTheDocument();
    });

    it('should render the component with heading text and heading level', () => {
      const { getByText } = renderComponent({
        heading: 'headingText',
      });

      const content = getByText(/Content/);
      expect(content).toBeInTheDocument();

      const heading = getByText(/headingText/);
      expect(heading).toContainHTML('h2');
    });

    it('should render the component with heading', () => {
      const { getByText } = renderComponent({
        heading: <IressText>headingText</IressText>,
      });

      const heading = getByText(/headingText/);
      expect(heading).toBeInTheDocument();
    });

    it('should render the component with string heading', () => {
      const { getByRole } = renderComponent({
        heading: 'headingText',
      });

      const heading = getByRole('heading', { name: 'headingText', level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should render the component with actions', () => {
      const { getByRole } = renderComponent({
        actions: <IressButton>Action</IressButton>,
      });

      const button = getByRole('button', { name: 'Action' });
      expect(button).toBeInTheDocument();
    });
  });

  it('should render the component with all testids', () => {
    const { getByTestId } = renderComponent({
      heading: 'headingText',
      'data-testid': 'test-toast',
      dismissible: true,
    });

    expect(getByTestId('test-toast')).toBeInTheDocument();
    expect(getByTestId('test-toast__content')).toBeInTheDocument();
    expect(getByTestId('test-toast__close-button__button')).toBeInTheDocument();
    expect(getByTestId('test-toast__heading')).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderComponent();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
