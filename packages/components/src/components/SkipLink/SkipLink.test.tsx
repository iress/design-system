import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSkipLink, type IressSkipLinkProps } from '.';
import { idsLogger } from '@helpers/utility/idsLogger';

const TEST_ID = 'test-component';
const DEFAULT_LABEL = 'Skip to content';

function renderComponent(props?: IressSkipLinkProps) {
  return render(<IressSkipLink {...props} data-testid={TEST_ID} />);
}

describe('IressSkipLink', () => {
  it('should render with test id', () => {
    const { getByTestId } = renderComponent({ href: 'blah' });
    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  describe('default (no props)', () => {
    afterEach(() => vitest.clearAllMocks());

    it('renders nothing, and throws error if no targetId or href is defined', () => {
      const { queryByText } = renderComponent();

      expect(queryByText(DEFAULT_LABEL)).toBeNull();
      expect(idsLogger).toHaveBeenCalledTimes(1);
    });

    it('renders children', () => {
      const { getByText } = renderComponent({
        children: 'hello world',
        targetId: 'hello',
      });

      expect(getByText('hello world')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    describe('targetId', () => {
      it('renders if targetId is defined', () => {
        const { getByRole } = renderComponent({
          targetId: 'main',
        });

        const link = getByRole('link', { name: DEFAULT_LABEL });

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '#main');
      });
    });

    describe('href', () => {
      it('renders if href is defined', () => {
        const { getByRole } = renderComponent({
          href: '#main',
        });

        const link = getByRole('link', { name: DEFAULT_LABEL });

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '#main');
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderComponent({
        targetId: 'main',
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
