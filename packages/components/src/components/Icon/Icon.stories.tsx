import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressIcon, type IressIconProps } from './Icon';
import { IressText } from '../Text';
import { IressInline } from '../Inline';
import { componentStoryMeta, withSource } from '@iress-oss/ids-storybook-config';
import { IressLink } from '../Link';
import { IressIconProvider } from './IconProvider';
import React, { useMemo, useState } from 'react';
import { IressButton } from '../Button';
import { IressInput } from '../Input';
import { IressStack } from '../Stack';
import { IressTable } from '../Table';
import { IressToggle } from '../Toggle';
import type { MaterialSymbol } from 'material-symbols';
import { getMaterialSymbolsListCached } from './helpers/getMaterialSymbolsList';
import { useAutocompleteSearch } from '../Autocomplete';
import { type LabelValueMeta } from '@/interfaces';
import { IressTag } from '../Tag';
import { IressTooltip } from '../Tooltip';
import { FA_TO_MATERIAL_MAP } from './helpers/iconMapping';
import componentMeta from './meta';

import { IconFilled } from './mocks/IconFilled';
import IconFilledSource from './mocks/IconFilled.tsx?raw';
import { IconFlip } from './mocks/IconFlip';
import IconFlipSource from './mocks/IconFlip.tsx?raw';
import { IconRotate } from './mocks/IconRotate';
import IconRotateSource from './mocks/IconRotate.tsx?raw';
import { IconSpin } from './mocks/IconSpin';
import IconSpinSource from './mocks/IconSpin.tsx?raw';
import { IressDivider } from '../Divider';

type Story = StoryObj<IressIconProps>;

export default {
  title: 'Components/Icon',
  component: IressIcon,
  ...componentStoryMeta(componentMeta),
} as Meta<typeof IressIcon>;

export const Default: Story = {
  args: {
    name: 'home',
  },
};

export const Icons: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Search and browse through all 3,800+ Material Symbols icons.
Icons are loaded lazily from the material-symbols library for optimal performance.

**Features:**
- Search by name (e.g., "arrow", "home", "settings")
- Toggle between outlined (default) and filled variants
- Click any icon to copy its name to clipboard
- Table view for easy browsing

**Note:** Icons are loaded dynamically the first time you open this story.

---
        `,
      },
    },
  },
  render: (_args) => {
    const [query, setQuery] = useState('');
    const [showFilled, setShowFilled] = useState(false);
    const [showAllIcons, setShowAllIcons] = useState(false);
    const [allIcons, setAllIcons] = useState<LabelValueMeta[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

    // Load icons on mount
    React.useEffect(() => {
      getMaterialSymbolsListCached()
        .then((symbols) => {
          const iconData: LabelValueMeta[] = symbols.map((name) => ({
            label: name,
            value: name,
          }));
          setAllIcons(iconData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to load Material Symbols:', error);
          setLoading(false);
        });
    }, []);

    const {
      debouncedQuery,
      loading: searching,
      results,
    } = useAutocompleteSearch({
      debounceThreshold: 0,
      initialOptions: allIcons,
      options: allIcons,
      query,
    });

    const handleCopyIconName = (iconName: string) => {
      void navigator.clipboard.writeText(iconName);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(null), 2000);
    };

    const columns = useMemo(
      () => [
        {
          key: 'value',
          label: 'Preview',
          width: '80px',
          format: (name: MaterialSymbol) => (
            <IressIcon
              name={name}
              filled={showFilled}
              textStyle="typography.heading.3"
            />
          ),
        },
        {
          key: debouncedQuery ? 'formattedLabel' : 'label',
          label: 'Name (click to copy)',
          format: (name: MaterialSymbol) => {
            if (copiedIcon === name) {
              return <IressTag>✓ Copied!</IressTag>;
            }

            return (
              <IressTag onClick={() => handleCopyIconName(name)}>
                {name}
              </IressTag>
            );
          },
        },
      ],
      [showFilled, copiedIcon, debouncedQuery],
    );

    const displayedResults = useMemo(() => {
      // If searching or showing all icons, display full results
      if (showAllIcons) {
        return results;
      }
      // Otherwise, limit to first 100 icons
      return results.slice(0, 100);
    }, [results, showAllIcons]);

    const caption = useMemo(() => {
      if (loading) return 'Loading icons...';
      if (searching) return 'Searching...';

      let append = 'total';

      if (debouncedQuery) {
        append = `matching "${debouncedQuery}"`;
      }

      if (!showAllIcons) {
        if (results.length < 100) {
          return `Material Symbols (${results.length} ${append})`;
        }

        return `Material Symbols (showing first 100 of ${results.length} ${append})`;
      }

      return `Material Symbols (${results.length} ${append})`;
    }, [loading, searching, debouncedQuery, results.length, showAllIcons]);

    return (
      <IressIconProvider noSubsetting>
        <IressStack gap="xs">
          <IressStack gap="sm">
            <IressInput
              clearable
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery('')}
              placeholder="Search by name (e.g., home, arrow, settings)..."
              type="search"
              prepend={<IressIcon name="search" />}
              loading={searching || loading}
              variant="search"
            />
            <IressInline
              gap="md"
              horizontalAlign="between"
              verticalAlign="middle"
            >
              <IressText color="muted">
                Click any icon name to copy it to clipboard
              </IressText>
              <IressInline gap="md" verticalAlign="middle">
                <IressToggle checked={showFilled} onChange={setShowFilled}>
                  Show filled variant
                </IressToggle>
                <IressToggle checked={showAllIcons} onChange={setShowAllIcons}>
                  Show all icons{' '}
                  <IressTooltip tooltipText="Enable to use browser search (Ctrl+F/Cmd+F) for easier browsing">
                    <IressButton mode="muted">
                      <IressIcon name="info-circle" />
                    </IressButton>
                  </IressTooltip>
                </IressToggle>
              </IressInline>
            </IressInline>
          </IressStack>

          <IressTable
            caption={caption}
            columns={columns}
            rows={displayedResults}
            empty={loading ? 'Loading icons...' : 'No icons found'}
            scope="col"
            compact
          />
        </IressStack>
        <IressDivider my="spacing.10" />
      </IressIconProvider>
    );
  },
  tags: ['reference'],
};

export const ScreenReaderText: Story = {
  args: {
    ...Default.args,
    screenreaderText: 'Home',
  },
};

export const Filled: Story = {
  render: (_args) => <IconFilled />,
  parameters: {
    controls: { disable: true },
    ...withSource(IconFilledSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Flip: Story = {
  render: (args) => <IconFlip {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(IconFlipSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Rotate: Story = {
  render: (args) => <IconRotate {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(IconRotateSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const Spin: Story = {
  render: (args) => <IconSpin {...args} />,
  parameters: {
    controls: { disable: true },
    ...withSource(IconSpinSource, { stripImports: true, stripExportFunction: true }),
  },
};

export const ExternalLink: Story = {
  args: {
    ...Default.args,
    name: 'external-link',
    pl: 'spacing.2',
    screenreaderText: '(Opens in a new tab)',
  },
  render: (args) => (
    <IressLink
      href="https://www.iress.com/"
      target="_blank"
      rel="noreferrer"
      append={<IressIcon {...args} />}
    >
      Go to this link
    </IressLink>
  ),
};

export const FontAwesomeToMaterialMigration: Story = {
  render: () => (
    <IressTable
      caption="Font Awesome to Material Symbols Migration Reference"
      compact
      columns={[
        {
          key: 'fontAwesome',
          label: 'Font Awesome',
          format: (icon: never) => (
            <IressText>
              <IressIcon type="fontawesome" name={icon} /> ({icon})
            </IressText>
          ),
        },
        {
          key: 'materialSymbols',
          label: 'Material Symbols',
          format: (icon: never) => (
            <IressText>
              <IressIcon name={icon} /> ({icon})
            </IressText>
          ),
        },
      ]}
      rows={Object.entries(FA_TO_MATERIAL_MAP).map(
        ([fontAwesome, materialSymbols]) => ({
          fontAwesome,
          materialSymbols,
        }),
      )}
      scope="col"
    />
  ),
  decorators: [
    (Story) => (
      <IressIconProvider type="fontawesome">
        <IressIconProvider noSubsetting>
          <Story />
        </IressIconProvider>
      </IressIconProvider>
    ),
  ],
  tags: ['reference'],
};
