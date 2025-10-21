import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressButton,
  IressFilter,
  IressIcon,
  IressInline,
  IressInput,
  IressPanel,
  IressPopover,
  IressStack,
  IressTable,
  IressToggle,
  toArray,
  useAutocompleteSearch,
} from '@iress-oss/ids-components';
import { useMemo, useState, type PropsWithChildren } from 'react';
import { type Type } from '../src/enums';
import { type IressTokenSchema } from '../src/types';
import { type IressDesignToken } from '../src/interfaces';
import { designTokens } from '../src/schema';
import { unique } from 'radash';
import { TokenTag } from './components/TokenTag';

type Story = StoryObj<typeof IressTable>;

interface TokenMetadata {
  label: string;
  alias?: string[];
  type: Type;
  description: string;
  defaultValue: string;
  deprecated?: string;
  readonly?: boolean;
}

const ColumnInfo = ({ children }: PropsWithChildren) => (
  <IressPopover
    activator={
      <IressButton mode="tertiary">
        <IressIcon name="info-circle" screenreaderText="More information" />
      </IressButton>
    }
    align="top"
    container={document.body}
  >
    <IressPanel>{children}</IressPanel>
  </IressPopover>
);

const wrapTokens = (content: string) => {
  const parts = content.split(/(\b[A-Za-z0-9]+\.[A-Za-z0-9.]+\b)/g);

  return parts.map((part, index) =>
    /\b[A-Za-z0-9]+\.[A-Za-z0-9.]+\b/.test(part) ? (
      <TokenTag key={index}>{part}</TokenTag>
    ) : (
      part
    ),
  );
};

const labelColumn = (key = 'label') => ({
  key,
  label: (
    <span style={{ whiteSpace: 'nowrap' }}>
      Name
      <ColumnInfo>
        The name of the token that can be used in component props or from the
        theme object.
      </ColumnInfo>
    </span>
  ),
  width: '10rem',
  format: (value: string) => <TokenTag>{value}</TokenTag>,
});

const tokenTableColumns = [
  {
    key: 'alias',
    label: (
      <span style={{ whiteSpace: 'nowrap' }}>
        Alias
        <ColumnInfo>
          A shorter name for the token that can be used in components (aliases
          are not available on the theme object).
        </ColumnInfo>
      </span>
    ),
    format: (value?: string[]) => value?.join(', '),
  },
  {
    key: 'type',
    label: (
      <span style={{ whiteSpace: 'nowrap' }}>
        Type
        <ColumnInfo>
          Describes how this token is mapped to CSS/Figma properties
        </ColumnInfo>
      </span>
    ),
  },
  {
    key: 'description',
    label: (
      <span style={{ whiteSpace: 'nowrap' }}>
        Description
        <ColumnInfo>Details on how this token should be used</ColumnInfo>
      </span>
    ),
  },
  {
    key: 'defaultValue',
    label: (
      <span style={{ whiteSpace: 'nowrap' }}>
        Default value
        <ColumnInfo>
          This is the default value of this token when no theme is applied (the
          white-label theme value)
        </ColumnInfo>
      </span>
    ),
    format: (value: string) => (
      <pre style={{ whiteSpace: 'normal' }}>{value}</pre>
    ),
  },
  {
    key: 'deprecated',
    label: (
      <span style={{ whiteSpace: 'nowrap' }}>
        Deprecated
        <ColumnInfo>
          Deprecated means the token will be discontinued in the future, and you
          should avoid using it. Each deprecated token has instructions on what
          to use instead.
        </ColumnInfo>
      </span>
    ),
    format: (value: string) => (value ? <>{wrapTokens(value)}</> : null),
  },
  {
    key: 'readonly',
    label: (
      <span style={{ whiteSpace: 'nowrap' }}>
        Themeable
        <ColumnInfo>
          Whether a token can be changed between themes. Deprecated items are
          hidden here on purpose.
        </ColumnInfo>
      </span>
    ),
    textAlign: 'right',
    format: (value: boolean, row: TokenMetadata) => {
      if (value || row.deprecated) return <></>;
      return <IressIcon name="check" screenreaderText="Yes" />;
    },
  },
];

const mapTokensToMetadata = (tokens: IressTokenSchema) => {
  const tokenMetadata: Record<string, TokenMetadata> = {};
  let currentPath: string[] = [];
  let readonly: boolean[] = [];

  // This function iterates over the schema and maps the tokens to metadata based on the currentPath
  const iterate = (schemaItem: IressTokenSchema) => {
    for (const [path, value] of Object.entries(schemaItem)) {
      // If the value is not an object, it means we are inside a token, so we skip it
      if (typeof value !== 'object') {
        continue;
      }

      const token = value as IressDesignToken;

      // We update the current path of the token, as well as the token group readonly status
      currentPath = [...currentPath, path];
      readonly = [...readonly, token.$extensions?.['iress.readonly'] ?? false];

      if ('$type' in token) {
        const dotLabel = currentPath.join('.');

        // If the token has a type, it means it is a token, so we get its metadata
        // If the token or any of its groups are readonly, we set the readonly flag to true
        tokenMetadata[dotLabel] = {
          label: dotLabel,
          alias: token.$extensions?.['iress.aliases'],
          type: token.$type,
          description: token.$description,
          defaultValue:
            typeof token.$value === 'object'
              ? JSON.stringify(token.$value, null, 2)
              : String(token.$value),
          deprecated: token.$deprecated,
          readonly: readonly.some((r) => r),
        };
      } else {
        // If the token does not have a type, it means it is a group, so we iterate over it
        iterate(value as IressTokenSchema);
      }

      // We remove the last path element to go back to the parent token
      currentPath.pop();
      readonly.pop();
    }
  };

  // We start the iteration at the top level separately so we can restart the path
  for (const [path, value] of Object.entries(tokens)) {
    currentPath = [path];
    readonly = [
      (value as IressDesignToken).$extensions?.['iress.readonly'] ?? false,
    ];
    iterate(value as IressTokenSchema);
  }

  return tokenMetadata;
};

const TokenTable = () => {
  const metadata = Object.values(mapTokensToMetadata(designTokens));

  const [query, setQuery] = useState('');
  const [showing, setShowing] = useState<string[]>([
    'label',
    'alias',
    'description',
    'readonly',
  ]);
  const [showDeprecated, setShowDeprecated] = useState(false);

  const { debouncedQuery, loading, results } = useAutocompleteSearch({
    initialOptions: metadata,
    options: metadata,
    query,
  });

  const columns = useMemo(() => {
    const labelKey = debouncedQuery ? 'formattedLabel' : 'label';
    return [labelColumn(labelKey), ...tokenTableColumns];
  }, [debouncedQuery]);

  const filteredColumns = useMemo(() => {
    return columns.filter(
      (column) =>
        showing.includes(column.key) ||
        (showing.includes('label') && column.key === 'formattedLabel'),
    );
  }, [columns, showing]);

  // TODO: Probably need to look at making useAutocompleteSearch use a generic type
  const filteredResults = useMemo(
    () =>
      results.filter(
        (result) => showDeprecated || !(result as TokenMetadata).deprecated,
      ),
    [results, showDeprecated],
  );

  const caption = useMemo(() => {
    if (debouncedQuery && !loading) {
      return `${filteredResults.length} results matching ${debouncedQuery}`;
    }

    if (loading) {
      return 'Searching...';
    }

    return `Tokens (${filteredResults.length})`;
  }, [debouncedQuery, loading, filteredResults.length]);

  return (
    <IressStack gap="spacing.400">
      <IressInput
        clearable
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery('')}
        placeholder="Search by name"
        type="search"
      />
      <IressInline gap="md" horizontalAlign="between">
        <IressFilter
          label="Columns"
          onChange={(values) =>
            setShowing(
              unique(['label', ...toArray(values).map((value) => value.label)]),
            )
          }
          options={columns.map((column) => ({
            label: column.key,
          }))}
          value={showing.map((column) => ({
            label: column,
          }))}
          multiSelect
        />
        <IressToggle
          checked={showDeprecated}
          onChange={(checked) => {
            setShowDeprecated(checked);

            if (!checked) {
              setShowing((showing) =>
                showing.filter((column) => column !== 'deprecated'),
              );
            }
          }}
        >
          Show deprecated tokens
        </IressToggle>
      </IressInline>
      <IressTable
        caption={caption}
        mb="none"
        columns={filteredColumns as never}
        rows={filteredResults}
        empty={loading ? 'Loading...' : 'No results found'}
        scope="col"
      />
    </IressStack>
  );
};

export default {
  title: 'Introduction',
  component: TokenTable,
  args: {
    gap: 'md',
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
} as Meta<typeof TokenTable>;

export const Reference: Story = {};
