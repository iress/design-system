import { type SourceProps } from '@storybook/addon-docs/blocks';
import {
  withTransformedProviderSource,
  withTransformedRawSource,
  withTransformedSource,
} from './withTransformedSource';
import { type ParametersConfig } from '../types';

describe('withTransformedSource', () => {
  it('creates an docs parameter with a source transformer', () => {
    const transform: SourceProps['transform'] = (code) =>
      `Transformed snippet from: ${code}`;

    expect(withTransformedSource(transform, 'jsx')).toEqual({
      docs: {
        source: {
          language: 'jsx',
          transform,
        },
      },
    });
  });
});

describe('withTransformedRawSource', () => {
  const rawSource = `
export const StorybookFriendlyComponent = (args: IressAutocompleteProps) => {
  const [value, setValue] = useState('Option 1');

  return (
    <IressAutocomplete
      {...args}
      onChange={(_e, newValue) => setValue(newValue ?? '')}
      onClear={() => setValue('')}
      value={value}
    />
  );
};
`;
  const propName = 'IressAutocompleteProps';

  it('creates a source transformer that changes customisable Storybook source to a working Sandbox source', () => {
    const parameters: ParametersConfig = withTransformedRawSource(
      rawSource,
      propName,
    );

    expect(
      parameters?.docs?.source?.transform?.('random', {
        args: { value: 'Option 2' },
      }),
    ).toBe(`
export const StorybookFriendlyComponent = () => {
  const [value, setValue] = useState('Option 1');

  return (
    <IressAutocomplete
      {...{
  value: 'Option 2',
}}
      onChange={(_e, newValue) => setValue(newValue ?? '')}
      onClear={() => setValue('')}
      value={value}
    />
  );
};
`);
  });

  it('creates a source transformer that removes args if none provided via context', () => {
    const parameters: ParametersConfig = withTransformedRawSource(
      rawSource,
      propName,
    );

    expect(parameters?.docs?.source?.transform?.('random', {})).toBe(`
export const StorybookFriendlyComponent = () => {
  const [value, setValue] = useState('Option 1');

  return (
    <IressAutocomplete
      
      onChange={(_e, newValue) => setValue(newValue ?? '')}
      onClear={() => setValue('')}
      value={value}
    />
  );
};
`);
  });

  it('omits args if provided', () => {
    const parameters: ParametersConfig = withTransformedRawSource(
      rawSource,
      propName,
      ['children'],
    );

    const result = parameters?.docs?.source?.transform?.('random', {
      args: {
        children: 'I will disappear',
        label: 'I will stay',
      },
    });

    expect(result).toBe(`
export const StorybookFriendlyComponent = () => {
  const [value, setValue] = useState('Option 1');

  return (
    <IressAutocomplete
      {...{
  label: 'I will stay',
}}
      onChange={(_e, newValue) => setValue(newValue ?? '')}
      onClear={() => setValue('')}
      value={value}
    />
  );
};
`);
  });
});

describe('withTransformedProviderSource', () => {
  it('creates a source transformer that changes provider and hook code to a working Sandbox source', () => {
    const parameters: ParametersConfig = withTransformedProviderSource(
      `<IressModalProvider>
        <Story />
      </IressModalProvider>`,
      `const { showModal } = useModal(); return <Story />;`,
    );

    expect(
      parameters?.docs?.source?.transform?.(
        `<button onClick={() => showModal('hello')}>World</button>`,
        {},
      ),
    ).toBe(`const Story = () => {
  const { showModal } = useModal(); return <button onClick={() => showModal('hello')}>World</button>;
};
  
export const App = () => (
  <IressModalProvider>
        <Story />
      </IressModalProvider>
);`);
  });
});
