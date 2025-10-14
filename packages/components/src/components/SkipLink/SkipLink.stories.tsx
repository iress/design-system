import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressSkipLink } from '.';
import { IressContainer } from '../Container';
import { withJsxTransformer } from '@iress-storybook/helpers';
import { IressPanel } from '../Panel';

type Story = StoryObj<typeof IressSkipLink>;

export default {
  title: 'Components/SkipLink',
  component: IressSkipLink,
  tags: ['updated'],
} as Meta<typeof IressSkipLink>;

export const SkipLink: Story = {
  args: {
    href: '#main',
    id: 'skip-link',
  },
  render: (args) => (
    <IressContainer>
      <IressSkipLink {...args} />
      <main id="main" tabIndex={-1}>
        <IressPanel>
          <p>
            This is where the main content <code>id=&quot;main&quot;</code> of
            the application is located. It is important that whatever your skip
            link is targeting is <strong>focusable</strong>. If its a
            non-interactive element, this can be done by adding{' '}
            <code>tabindex=&quot;-1&quot;</code> to the element.
          </p>

          <p>
            The skip link is{' '}
            <a
              href="#skip-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('skip-link')?.focus();
              }}
            >
              hidden until it is focused
            </a>
            .
          </p>
        </IressPanel>
      </main>
    </IressContainer>
  ),
  parameters: {
    ...withJsxTransformer({
      showFunctions: true,
    }),
  },
};
