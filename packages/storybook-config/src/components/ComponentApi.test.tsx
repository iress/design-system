// TODO: Probably better done with end-to-end tests
import { render, screen } from '@testing-library/react';
import { ComponentApi } from './ComponentApi';
import { type ControlProps } from '@storybook/addon-docs/blocks';

// We mock the @storybook/addon-docs/blocks package to avoid rendering the actual Controls component,
// Which relies on Storybook's context and would throw an error in a test environment (and is a pain to mock).
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const controlsProps = vi.fn() as unknown;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const categoryClick = vi.fn() as unknown;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
vi.mock('@storybook/addon-docs/blocks', async (importOriginal) => ({
  ...(await (
    importOriginal as () => Promise<
      typeof import('@storybook/addon-docs/blocks')
    >
  )()),
  Controls: (props: ControlProps<never>) => {
    (controlsProps as (props: ControlProps<never>) => void)(props);

    return (
      <table>
        <thead>
          <tr title="Toggle category">
            <th>
              <button onClick={categoryClick as () => void}>
                Toggle category
              </button>
            </th>
          </tr>
        </thead>
      </table>
    );
  },
}));

describe('ComponentApi', () => {
  it('renders controls table, and closes categories after render', () => {
    render(<ComponentApi of={{}} />);

    expect(controlsProps).toHaveBeenCalledWith({
      exclude: ['data-testid', 'data-value'],
      of: {},
      sort: 'alpha',
    });

    expect(
      screen.getByRole('heading', { level: 2, name: 'Props' }),
    ).toBeInTheDocument();

    expect(categoryClick).toHaveBeenCalledTimes(1);
  });
});
