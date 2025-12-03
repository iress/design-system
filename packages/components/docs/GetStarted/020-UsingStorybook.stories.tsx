import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressCol, IressRow, IressText, IressPanel } from '@/main';
import { type ReactNode } from 'react';

interface DocsExampleProps {
  children: ReactNode;

  /**
   * Where to get the embed url for the video if using Google Drive?
   * https://www.colby.edu/acits/2020/01/30/how-to-embed-a-video-from-google-drive/
   * Also ensure that the video can be viewed by anyone in the Iress organisation.
   */
  video?: string;
  videoTitle?: string;
}

const DocsExample = ({
  children,
  video,
  videoTitle = 'Watch video',
}: DocsExampleProps) => (
  <IressPanel className="iress-mb--xl">
    <IressRow gutter="md">
      <IressCol>{children}</IressCol>
      {video && (
        <IressCol>
          <iframe
            title={videoTitle}
            src={video}
            style={{
              aspectRatio: '16 / 9',
              border: 0,
              width: '100%',
              maxWidth: '800px',
            }}
          />
        </IressCol>
      )}
    </IressRow>
  </IressPanel>
);

type Story = StoryObj<typeof DocsExample>;

export default {
  title: 'Get Started/Using Storybook',
  component: DocsExample,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} as Meta<typeof DocsExample>;

export const FirstTimeUsers: Story = {
  args: {
    children: (
      <IressText>
        <p>
          When you first come to the IDS Storybook, you may notice the pages
          look un-styled. This is the default theme of IDS. You can change the
          theme to the theme you normally use in your product by clicking the
          `brush` icon in the top left, right above this page.
        </p>{' '}
        <p>
          You can also change to use the dark theme of Storybook itself by
          clicking the `moon` icon in the top left, right above this page.
        </p>{' '}
        <p>
          These settings are saved so the next time you come back to Storybook,
          it will remember your preferences.
        </p>
      </IressText>
    ),
    video:
      'https://drive.google.com/file/d/14EXtfmDlEjy-6Qm0c8c4qqU5KbfEaQnh/preview',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const ScopingWork: Story = {
  args: {
    children: (
      <IressText>
        <p>
          If you are scoping work, you can use Storybook to see what components
          are available to you. You can also see how they are used and what
          states they can be in. This can help you to understand what is
          possible and what is not.
        </p>{' '}
        <p>
          {/* TODO: Remove (coming soon) once Guidelines has been migrated over */}
          Every IDS component has a <code>Docs</code> page and a
          <code>Guidelines</code> (coming soon) page. The <code>Docs</code> page
          will show you how to use the component and what props it accepts,
          helping you understand what is available, and how each property
          behaves to allow you to understand the final user experience of your
          feature.
        </p>{' '}
        <p>
          The <code>Guidelines</code> page will show you how to use the
          component in a way that is consistent with other Iress applications.
          It covers things like accessibility, usability, and design principles,
          as well as which scenario to use which component and common pitfalls.
        </p>
      </IressText>
    ),
    video:
      'https://drive.google.com/file/d/1csZepApw9WOEpF50mXmgoNgnW_YRENxP/preview',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Design: Story = {
  args: {
    children: (
      <IressText>
        <p>
          When designing a new feature, you can use Storybook to see how your
          designs will look and behave in a real application.
        </p>{' '}
        <p>
          <code>Docs</code> and <code>Guidelines</code> (coming soon) pages will
          help you understand how to use the components and what is possible,
          and help you align to any design decisions made previously.
        </p>{' '}
        <p>
          <code>Stories</code> are a good way to see how variations of a
          component look and behave. You can see how a component looks in
          different states, and how it behaves with different props. If there is
          a variation that is not shown in the <code>Stories</code>, you can use
          the <code>Controls</code> tab to change the props of the component to
          see how it behaves with different values. You can also toggle how each
          component looks at different breakpoints (screen sizes/devices), how
          they look to users with certain eyesight conditions, and how they look
          in different states.
        </p>
      </IressText>
    ),
    video:
      'https://drive.google.com/file/d/1zBhhxFYTmgzq-d6UFHJ3qAOAJ1mOLnxB/preview',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Development: Story = {
  args: {
    children: (
      <IressText>
        <p>
          During development, you can refer to Storybook for code examples and
          understand the API available to you.
        </p>{' '}
        <p>
          If you are using Typescript, majority of the API is available in your
          IDE. However, Storybook provides more than just the API. It provides
          examples of how to use and combine the properties, as well as which
          components were designed to work with each other.
        </p>{' '}
        <p>
          <code>Docs</code> covers the API of the component, and also discusses{' '}
          <code>Examples (stories)</code>
          in detail alongside code examples.
        </p>
        <p>
          If you want to see how a component looks and behaves with different
          props, you can use the <code>Controls</code> tab to change the props
          of the component to see how it behaves with different values. You can
          also toggle how each component looks at different breakpoints (screen
          sizes/devices), how they look to users with certain eyesight
          conditions, and how they look in different states.
        </p>
        <p>
          IDS is a starting point for your application development. It provides
          the foundations to make your application look and behave in a
          consistent way to other Iress products. However, not everything is
          covered here. It is good to discuss with designers and other
          developers to understand any constraints or guidelines that are not
          covered by IDS.
        </p>
      </IressText>
    ),
    video:
      'https://drive.google.com/file/d/1Y4337tvAfScvm01ycxLRuKoAwzdchCIo/preview',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const CantFindControlsTab: Story = {
  args: {
    children: (
      <IressText>
        <p>
          These tabs are only shown in the component <code>Stories</code>, which
          can be toggled to display using the bookmark icon on the top right of
          the screen. If you click on an stories and still cannot see it, you
          may need to toggle the orientation of the addon. You can do this by
          tapping the <code>d</code> key twice, or using the settings as shown
          in the video.
        </p>{' '}
      </IressText>
    ),
    video:
      'https://drive.google.com/file/d/1eGuWGmCg0Utdp0bh_WEDvMuY_EWbDl2e/preview',
  },
  parameters: {
    layout: 'fullscreen',
  },
};
