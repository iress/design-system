import { transformCode } from './transformCode';
import { EDITOR_TRANSFORMERS, PREVIEW_TRANSFORMERS } from '../constants';

const snippet = `
import React from 'react';
import {
  IressBadge,
  IressButton,
  IressCard,
  IressPanel,
  IressStack,
  IressText,
} from '@/main';

const Header = () => (
  <IressText>
    <h2>Welcome to the IDS Sandbox</h2>
    <p>
      To start editing, toggle the editor on using the <code>a</code> key in
      your keyboard and write some code!
    </p>
  </IressText>
);

export const App = () => {
  const [count, setCount] = React.useState<number>(0);
  const props = {
    container: {
      '_constructor-name_': 'HTMLBodyElement'
    }
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <IressPanel bg="alt" p="lg" container={[object HTMLBodyElement]}>
      <Header />
      <IressText element="h2">Features</IressText>
      <IressStack gap="lg">
        <IressCard heading="Support for React hooks" stretch>
          <IressText element="p">
            You can now use React hooks inside the Sandbox! This gives you the
            power to create functional prototypes straight from Sandbox.
          </IressText>
        </IressCard>
      </IressStack>
    </IressPanel>
  );
};
`;

describe('transformCode', () => {
  it('transforms a string using EDITOR_TRANSFORMERS correctly', () => {
    const result = transformCode(snippet, EDITOR_TRANSFORMERS);

    expect(result).toBe(`const Header = () => (
  <IressText>
    <h2>Welcome to the IDS Sandbox</h2>
    <p>
      To start editing, toggle the editor on using the <code>a</code> key in
      your keyboard and write some code!
    </p>
  </IressText>
);

export const App = () => {
  const [count, setCount] = React.useState<number>(0);
  const props = {
    container: document.body
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <IressPanel bg="alt" p="lg" container={document.body}>
      <Header />
      <IressText element="h2">Features</IressText>
      <IressStack gap="lg">
        <IressCard heading="Support for React hooks" stretch>
          <IressText element="p">
            You can now use React hooks inside the Sandbox! This gives you the
            power to create functional prototypes straight from Sandbox.
          </IressText>
        </IressCard>
      </IressStack>
    </IressPanel>
  );
};`);
  });

  it('transforms a string using PREVIEW_TRANSFORMERS correctly', () => {
    const result = transformCode(snippet, PREVIEW_TRANSFORMERS);

    expect(result).toBe(`const Header = () => (
  <IressText>
    <h2>Welcome to the IDS Sandbox</h2>
    <p>
      To start editing, toggle the editor on using the <code>a</code> key in
      your keyboard and write some code!
    </p>
  </IressText>
);

const App = () => {
  const [count, setCount] = React.useState<number>(0);
  const props = {
    container: document.body
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <IressPanel bg="alt" p="lg" container={document.body}>
      <Header />
      <IressText element="h2">Features</IressText>
      <IressStack gap="lg">
        <IressCard heading="Support for React hooks" stretch>
          <IressText element="p">
            You can now use React hooks inside the Sandbox! This gives you the
            power to create functional prototypes straight from Sandbox.
          </IressText>
        </IressCard>
      </IressStack>
    </IressPanel>
  );
};

render(<App />);`);
  });

  it('adds render with all types of exports', () => {
    expect(
      transformCode('export default () => {};', PREVIEW_TRANSFORMERS),
    ).toBe(['const App = () => {};', '', 'render(<App />);'].join('\n'));

    expect(
      transformCode('export const Custom = () => {};', PREVIEW_TRANSFORMERS),
    ).toBe(['const Custom = () => {};', '', 'render(<Custom />);'].join('\n'));

    expect(
      transformCode('export function Custom () {}', PREVIEW_TRANSFORMERS),
    ).toBe(['function Custom () {}', '', 'render(<Custom />);'].join('\n'));
  });

  it('throws error if no component is exported', () => {
    expect(() =>
      transformCode('const Custom = () => {};', PREVIEW_TRANSFORMERS),
    ).toThrow(
      'No exports found. Please ensure you export one of your components in order to render the code.',
    );
  });
});
