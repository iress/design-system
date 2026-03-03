import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressIcon } from './Icon';
import { IressText } from '../Text';
import { IressInline } from '../Inline';
import { IressIconProvider, type IressIconProviderProps } from './IconProvider';
import { IressButton } from '../Button';
import { useState } from 'react';

type Story = StoryObj<IressIconProviderProps>;

export default {
  title: 'Components/Icon/IconProvider',
  component: IressIconProvider,
} as Meta<typeof IressIconProvider>;

export const IconProvider: Story = {
  name: 'Icon Provider',
  parameters: {
    docs: {
      description: {
        story: `
The \`IressIconProvider\` is **optional** for Material Symbols icons as they are now bundled as SVG components.

**Material Symbols (v6+):**
Icons are pre-generated as SVG React components:
- ✅ No provider required (works without IressIconProvider)
- ✅ Tree-shakeable (bundle only includes icons you use)
- ✅ Lazy-loaded (icons load on first use with React.lazy)
- ✅ CSP compliant (no external requests)
- ✅ Works offline (no CDN dependency)
- ✅ Works in Shadow DOM without special handling

**Font Awesome (deprecated):**
Provider is required for Font Awesome icons to load fonts from CDN:

\`\`\`tsx
import { IressIconProvider } from '@iress-oss/ids-components';

function App() {
  return (
    <IressIconProvider type="fontawesome">
      <YourApp />
    </IressIconProvider>
  );
}
\`\`\`

**When to Use Provider:**
- Using Font Awesome icons (deprecated)
- Want to set default icon type for all child icons
- Otherwise, provider is optional for Material Symbols

**Test Lazy Loading:**
Click "Load More Icons" below to see how icons lazy-load on first use.
        `,
      },
    },
  },
  render: () => {
    const [showMoreIcons, setShowMoreIcons] = useState(false);
    const [showEvenMore, setShowEvenMore] = useState(false);

    return (
      <IressIconProvider>
        <IressText element="h3" textStyle="typography.heading.4" mb="spacing.4">
          Material Symbols Icons (SVG Components)
        </IressText>
        <IressText mb="spacing.4" color="muted">
          Initial set: Icons lazy-load on first use, then render instantly
        </IressText>
        <IressInline gap="md" mb="spacing.6">
          <IressText textAlign="center">
            <IressIcon name="home" textStyle="typography.heading.2" />
            <br />
            home
          </IressText>
          <IressText textAlign="center">
            <IressIcon name="search" textStyle="typography.heading.2" />
            <br />
            search
          </IressText>
          <IressText textAlign="center">
            <IressIcon name="settings" textStyle="typography.heading.2" />
            <br />
            settings
          </IressText>
          <IressText textAlign="center">
            <IressIcon name="star" filled textStyle="typography.heading.2" />
            <br />
            star (filled)
          </IressText>
          <IressText textAlign="center">
            <IressIcon name="delete" textStyle="typography.heading.2" />
            <br />
            delete
          </IressText>
          <IressText textAlign="center">
            <IressIcon name="check" textStyle="typography.heading.2" />
            <br />
            check
          </IressText>
        </IressInline>

        {!showMoreIcons && (
          <IressButton
            onClick={() => setShowMoreIcons(true)}
            style={{
              padding: '8px 16px',
              marginBottom: '16px',
              cursor: 'pointer',
            }}
          >
            Load More Icons (Set 2)
          </IressButton>
        )}

        {showMoreIcons && (
          <>
            <IressText
              element="h3"
              textStyle="typography.heading.4"
              mb="spacing.4"
            >
              Additional Icons (Set 2)
            </IressText>
            <IressText mb="spacing.4" color="muted">
              Watch: Previous icons stay loaded (cached by React.lazy)
            </IressText>
            <IressInline gap="md" mb="spacing.6">
              <IressText textAlign="center">
                <IressIcon name="folder" textStyle="typography.heading.2" />
                <br />
                folder
              </IressText>
              <IressText textAlign="center">
                <IressIcon name="mail" textStyle="typography.heading.2" />
                <br />
                mail
              </IressText>
              <IressText textAlign="center">
                <IressIcon
                  name="notifications"
                  textStyle="typography.heading.2"
                />
                <br />
                notifications
              </IressText>
              <IressText textAlign="center">
                <IressIcon
                  name="calendar_today"
                  textStyle="typography.heading.2"
                />
                <br />
                calendar_today
              </IressText>
            </IressInline>
          </>
        )}

        {showMoreIcons && !showEvenMore && (
          <IressButton
            onClick={() => setShowEvenMore(true)}
            style={{
              padding: '8px 16px',
              marginBottom: '16px',
              cursor: 'pointer',
            }}
          >
            Load Even More Icons (Set 3)
          </IressButton>
        )}

        {showEvenMore && (
          <>
            <IressText
              element="h3"
              textStyle="typography.heading.4"
              mb="spacing.4"
            >
              Even More Icons (Set 3)
            </IressText>
            <IressText mb="spacing.4" color="muted">
              All previous icons remain loaded (React.lazy caching)
            </IressText>
            <IressInline gap="md">
              <IressText textAlign="center">
                <IressIcon name="download" textStyle="typography.heading.2" />
                <br />
                download
              </IressText>
              <IressText textAlign="center">
                <IressIcon name="upload" textStyle="typography.heading.2" />
                <br />
                upload
              </IressText>
              <IressText textAlign="center">
                <IressIcon name="share" textStyle="typography.heading.2" />
                <br />
                share
              </IressText>
              <IressText textAlign="center">
                <IressIcon name="print" textStyle="typography.heading.2" />
                <br />
                print
              </IressText>
            </IressInline>
          </>
        )}
      </IressIconProvider>
    );
  },
};
