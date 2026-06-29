import { type Meta, type StoryObj } from '@storybook/react-vite';
import {
  IressCard,
  IressRow,
  IressStack,
  IressCol,
  IressInput,
  useAutocompleteSearch,
  IressIcon,
  IressField,
  IressDropdownMenu,
  IressInline,
  IressButton,
  type LabelValueMeta,
  IressSkeleton,
  IressContainer,
} from '@/main';
import { useState, useMemo, Suspense } from 'react';

import alert from './Alert/meta';
import autocomplete from './Autocomplete/meta';
import button from './Button/meta';
import buttonGroup from './ButtonGroup/meta';
import card from './Card/meta';
import checkbox from './Checkbox/meta';
import checkboxGroup from './CheckboxGroup/meta';
import col from './Col/meta';
import container from './Container/meta';
import divider from './Divider/meta';
import expander from './Expander/meta';
import field from './Field/meta';
import fieldGroup from './FieldGroup/meta';
import hide from './Hide/meta';
import icon from './Icon/meta';
import image from './Image/meta';
import inline from './Inline/meta';
import input from './Input/meta';
import inputCurrency from './InputCurrency/meta';
import label from './Label/meta';
import link from './Link/meta';
import menu from './Menu/meta';
import modal from './Modal/meta';
import panel from './Panel/meta';
import pill from './Pill/meta';
import placeholder from './Placeholder/meta';
import popover from './Popover/meta';
import progress from './Progress/meta';
import provider from './Provider/meta';
import radio from './Radio/meta';
import radioGroup from './RadioGroup/meta';
import readonly from './Readonly/meta';
import row from './Row/meta';
import select from './Select/meta';
import skeleton from './Skeleton/meta';
import slider from './Slider/meta';
import slideout from './Slideout/meta';
import skipLink from './SkipLink/meta';
import stack from './Stack/meta';
import styled from './Styled/meta';
import table from './Table/meta';
import tabSet from './TabSet/meta';
import tag from './Tag/meta';
import tagInput from './TagInput/meta';
import text from './Text/meta';
import toggle from './Toggle/meta';
import tooltip from './Tooltip/meta';
import spinner from './Spinner/meta';
import validationMessage from './ValidationMessage/meta';
import toaster from './Toaster/meta';

const components = [
  alert,
  autocomplete,
  button,
  buttonGroup,
  card,
  checkbox,
  checkboxGroup,
  col,
  container,
  divider,
  expander,
  field,
  fieldGroup,
  hide,
  icon,
  image,
  inline,
  input,
  inputCurrency,
  label,
  link,
  menu,
  modal,
  panel,
  pill,
  placeholder,
  popover,
  progress,
  provider,
  radio,
  radioGroup,
  readonly,
  row,
  select,
  skeleton,
  skipLink,
  slideout,
  slider,
  spinner,
  stack,
  styled,
  table,
  tabSet,
  tag,
  tagInput,
  text,
  toaster,
  toggle,
  tooltip,
  validationMessage,
];

const Reference = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<LabelValueMeta[]>([]);

  // Get all unique tags from components
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    components.forEach((component) => {
      component.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet)
      .sort((a, b) => a.localeCompare(b))
      .map((tag) => ({ label: tag, value: tag }));
  }, []);

  // Create searchable options from components array
  const searchableOptions = useMemo(() => {
    return components.map((component) => ({
      label: component.heading,
      value: component.heading,
      meta: component.tags?.join(', ') ?? '',
    }));
  }, []);

  // Custom search function that searches both heading and tags
  const customSearchFunction = useMemo(() => {
    return (query: string) => {
      const normalizedQuery = query.toLowerCase();
      return Promise.resolve(
        searchableOptions.filter((option) => {
          const matchesHeading = option.label
            .toLowerCase()
            .includes(normalizedQuery);
          const matchesTags = option.meta
            .toLowerCase()
            .includes(normalizedQuery);
          return matchesHeading || matchesTags;
        }),
      );
    };
  }, [searchableOptions]);

  // Use the autocomplete search hook
  const { results } = useAutocompleteSearch({
    query: searchQuery,
    options: customSearchFunction,
    debounceThreshold: 0,
  });

  // Filter components based on search results and selected tags
  const filteredComponents = useMemo(() => {
    let componentsToFilter = components;

    // First filter by search query if present
    if (searchQuery.trim()) {
      const resultHeadings = new Set(results.map((result) => result.label));
      componentsToFilter = components.filter((component) =>
        resultHeadings.has(component.heading),
      );
    }

    // Then filter by selected tags if any are selected
    if (selectedTags.length > 0) {
      const selectedTagValues = selectedTags.map((tag) => tag.value);
      componentsToFilter = componentsToFilter.filter((component) => {
        return component.tags?.some((tag) => selectedTagValues.includes(tag));
      });
    }

    return componentsToFilter;
  }, [searchQuery, results, selectedTags]);

  return (
    <IressContainer>
    <IressStack gap="lg" my="lg" maxWidth="overlay.lg" mx="auto">
      <IressInline gap="md" horizontalAlign="between" verticalAlign="bottom">
        <IressField label="Search components" mb="none" stretch>
          <IressInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            clearable
            prepend={<IressIcon name="search" />}
            id="search-components"
          />
        </IressField>
        <IressDropdownMenu
          label="Filter by tags"
          multiSelect
          options={allTags}
          selected={selectedTags}
          onChange={setSelectedTags}
          onReset={() => setSelectedTags([])}
          visibleResetButton
          limitDesktop={9999}
        />
      </IressInline>
      <IressRow gutter="lg">
        {filteredComponents.map(({ Thumbnail, ...component }) => (
          <IressCol key={component.heading} span={{ xs: 12, md: 4 }}>
            <IressCard
              heading={component.heading}
              media={
                <Suspense
                  fallback={
                    <IressSkeleton mode="rect" width="751px" height="184px" />
                  }
                >
                  <Thumbnail />
                </Suspense>
              }
              footer={
                <IressInline gap="sm">
                  {'storybook' in component && component.storybook && (
                    <IressButton
                      mode="secondary"
                      compact
                      href={component.storybook}
                      target="_blank"
                    >
                      Storybook
                    </IressButton>
                  )}
                  {'guidelines' in component && component.guidelines && (
                    <IressButton
                      mode="secondary"
                      compact
                      href={component.guidelines}
                      target="_blank"
                    >
                      Guidelines
                    </IressButton>
                  )}
                </IressInline>
              }
              stretch
            >
              {component.description}
            </IressCard>
          </IressCol>
        ))}
      </IressRow>
    </IressStack>
    </IressContainer>
  );
};

type Story = StoryObj<typeof Reference>;

export default {
  title: 'Components/Introduction',
  component: Reference,
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: { disable: true },
    layout: 'fullscreen',
    idsConfig: {
      autodocsTemplate: 'landing',
    },
  },
} as Meta<typeof Reference>;

export const Default: Story = {
  render: () => <Reference />,
  parameters: {
    layout: 'fullscreen',
  },
};
