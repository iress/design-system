import { useState } from 'react';
import {
  IressBadge,
  IressButton,
  IressCard,
  IressPanel,
  IressStack,
  IressText,
} from '@iress-oss/ids-components';

const Header = () => (
  <IressText mb="md">
    <h2>Welcome to the IDS Sandbox</h2>
    <p>
      To start editing, toggle the editor on using the <code>a</code> key in
      your keyboard and write some code!
    </p>
  </IressText>
);

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <IressPanel bg="alt" p="lg">
      <Header />
      <IressText element="h2" mb="md">
        Features
      </IressText>
      <IressStack gap="lg">
        <IressCard heading="Support for React hooks" stretch>
          <IressText element="p">
            You can now use React hooks inside the Sandbox! This gives you the
            power to create functional prototypes straight from Sandbox.
          </IressText>
          <IressButton onClick={handleClick}>
            See <code>useState</code> at work
            <IressBadge mode="info" pill>
              {count}
            </IressBadge>
          </IressButton>
        </IressCard>
        <IressCard heading="Embedded in Storybook" stretch>
          <IressText element="p">
            Sandbox is now embedded in Storybook, so you have a single space to
            access to exploring the design system, as well as view your code in
            different breakpoints, themes, open code samples throughout the docs
            in the Sandbox.
          </IressText>
        </IressCard>
        <IressCard heading="Multiple components" stretch>
          <IressText element="p">
            You can have multiple components in the Sandbox, as per this example
            you are viewing. The final component is the one that is exported, so
            ensure you have a component being exported in your file.
          </IressText>
        </IressCard>
        <IressCard heading="Toolbar" stretch>
          <IressText element="p">
            A toolbar has been added, where you can share the code (or just the
            preview only), change the template or change the supported scopes in
            the Sandbox (yes, you can even prototype AG Grid in here if you so
            wish).
          </IressText>
        </IressCard>
      </IressStack>
    </IressPanel>
  );
};
