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
    disableProvider: true, // Disable the default provider wrapper to test the provider in isolation
    docs: {
      description: {
        story: `
The \`IressIconProvider\` enables automatic font subsetting, dramatically reducing bundle size
by loading only the icons actually used in your application.

**Bundle Size Optimization:**
- Full font: ~1.4MB
- 18 icons (typical usage): ~15-20KB (85% savings)
- Auto-optimizes based on actual usage

**Usage:**
\`\`\`tsx
import { IressIconProvider } from '@iress-oss/ids-components';

function App() {
  return (
    <IressIconProvider>
      <YourApp />
    </IressIconProvider>
  );
}
\`\`\`

**Benefits:**
- ✅ Automatic optimization (no configuration needed)
- ✅ Works for any number of icons (1 to 1000+)
- ✅ Google CDN handles caching and delivery
- ✅ Seamless icon transitions (existing icons stay visible while new ones load)
- ⚠️ Requires internet connection
- ⚠️ Brief loading delay (< 500ms on fast connections)

**When to Use:**
- Production apps where bundle size matters
- Apps with network connectivity
- When using < 100 unique icons

**When NOT to Use:**
- Offline/enterprise apps without internet (use full bundled font instead)
- SSR apps with critical icons above the fold

**Test Dynamic Loading:**
Click "Load More Icons" below to see how new icons are added without the existing ones disappearing.
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
          Icons with Auto-Subsetting Enabled
        </IressText>
        <IressText mb="spacing.4" color="muted">
          Initial set: 6 icons (~5-10KB from Google Fonts CDN vs 100KB full
          font)
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
              Watch: Previous icons stay visible while these load!
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
              All previous icons remain visible during this transition too!
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
