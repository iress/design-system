import { type Meta, type StoryObj } from '@storybook/react-vite';
import { IressCol, type IressColProps } from '.';
import { IressPlaceholder } from '../Placeholder';
import { IressRow, type IressRowProps } from '../Row';
import { IressStack } from '../Stack';
import { IressPanel } from '../Panel';
import { IressText } from '../Text';
import { IressContainer } from '../Container';
import {
  CurrentBreakpoint,
  disableArgTypes,
  removeArgTypes,
  STORYBOOK_ONLY_CATEGORY,
  withJsxTransformer,
} from '@iress-oss/ids-storybook-config';

type ColWithCustomArgs = React.ComponentProps<typeof IressCol> & {
  numberOfColumns?: number;
  columns?: IressColProps[];
  row?: IressRowProps;
};
type Story = StoryObj<ColWithCustomArgs>;

const columnsArgType = {
  name: 'Column settings',
  type: 'object' as never,
  table: {
    category: STORYBOOK_ONLY_CATEGORY,
  },
};

export default {
  title: 'Components/Col',
  component: IressCol,
  argTypes: {
    ...disableArgTypes(['children']),
    numberOfColumns: {
      name: 'Number of columns',
      description: 'Number of columns to render',
      type: 'number',
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
    },
    row: {
      name: 'Row settings',
      description: 'Change the row settings to see how the columns respond',
      type: 'object',
      table: {
        category: STORYBOOK_ONLY_CATEGORY,
      },
    },
  },
  parameters: {
    ...withJsxTransformer({
      filterProps: ['numberOfColumns', 'columns', 'row'],
    }),
  },
  tags: ['updated'],
} as Meta<typeof IressCol>;

export const Default: Story = {
  args: {
    children: <IressPlaceholder>Column</IressPlaceholder>,
    numberOfColumns: 2,
    row: {
      gutter: 'spacing.400',
    },
  },
  render: ({ numberOfColumns, row, ...args }) => {
    const columns = [...Array(numberOfColumns).keys()];

    return (
      <IressRow {...row}>
        {columns.map((index) => (
          <IressCol {...args} key={index}>
            <IressPlaceholder>{`Column ${index + 1}`}</IressPlaceholder>
          </IressCol>
        ))}
      </IressRow>
    );
  },
};

export const AutoSized: Story = {
  ...Default,
  argTypes: {
    ...removeArgTypes(['numberOfColumns']),
  },
  render: ({ row, ...column }) => (
    <IressStack gap="spacing.400">
      <IressRow {...row}>
        <IressCol {...column}>
          <IressPlaceholder>1 of 2</IressPlaceholder>
        </IressCol>
        <IressCol {...column}>
          <IressPlaceholder>2 of 2</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column}>
          <IressPlaceholder>1 of 3</IressPlaceholder>
        </IressCol>
        <IressCol {...column}>
          <IressPlaceholder>2 of 3</IressPlaceholder>
        </IressCol>
        <IressCol {...column}>
          <IressPlaceholder>3 of 3</IressPlaceholder>
        </IressCol>
      </IressRow>
    </IressStack>
  ),
};

export const Span: Story = {
  ...Default,
  argTypes: {
    ...removeArgTypes(['numberOfColumns', 'span']),
  },
  render: ({ row, ...column }) => (
    <IressStack gap="spacing.400">
      <IressRow {...row}>
        <IressCol {...column} span="12">
          <IressPlaceholder>12</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} span="1">
          <IressPlaceholder>1</IressPlaceholder>
        </IressCol>
        <IressCol {...column}>
          <IressPlaceholder>11</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} span="2">
          <IressPlaceholder>2</IressPlaceholder>
        </IressCol>
        <IressCol {...column}>
          <IressPlaceholder>10</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} span="3">
          <IressPlaceholder>3</IressPlaceholder>
        </IressCol>
        <IressCol {...column}>
          <IressPlaceholder>9</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} span="4">
          <IressPlaceholder>4</IressPlaceholder>
        </IressCol>
        <IressCol {...column}>
          <IressPlaceholder>8</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} span="5">
          <IressPlaceholder>5</IressPlaceholder>
        </IressCol>
        <IressCol {...column}>
          <IressPlaceholder>7</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} span="6">
          <IressPlaceholder>6</IressPlaceholder>
        </IressCol>
        <IressCol {...column}>
          <IressPlaceholder>6</IressPlaceholder>
        </IressCol>
      </IressRow>
    </IressStack>
  ),
};

export const ResponsiveSpan: Story = {
  ...Default,
  args: {
    ...Default.args,
    columns: [
      {
        span: {
          xs: 12,
          md: 3,
        },
      },
      {
        span: {
          xs: 12,
          md: 9,
        },
      },
    ],
  },
  argTypes: {
    ...removeArgTypes(['numberOfColumns', 'span']),
    columns: columnsArgType,
  },
  render: ({ row, columns = [], ...columnProps }) => (
    <IressStack gap="spacing.400">
      <IressPanel>
        Current breakpoint: <CurrentBreakpoint />.
      </IressPanel>

      <IressRow {...row}>
        {columns.map((column, index) => (
          <IressCol {...columnProps} {...column} key={index}>
            <IressPlaceholder>
              <IressText textAlign="center">
                Column {index + 1}
                <br />
                {column.span && JSON.stringify(column.span)}
              </IressText>
            </IressPlaceholder>
          </IressCol>
        ))}
      </IressRow>
    </IressStack>
  ),
};

export const Offset: Story = {
  ...Default,
  args: {
    ...Default.args,
    span: '1',
  },
  argTypes: {
    ...removeArgTypes(['numberOfColumns', 'offset']),
  },
  render: ({ row, ...column }) => (
    <IressStack gap="spacing.400">
      <IressRow {...row}>
        <IressCol {...column} offset="1">
          <IressPlaceholder>1</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} offset="2">
          <IressPlaceholder>2</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} offset="3">
          <IressPlaceholder>3</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} offset="4">
          <IressPlaceholder>4</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} offset="5">
          <IressPlaceholder>5</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} offset="6">
          <IressPlaceholder>6</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} offset="7">
          <IressPlaceholder>7</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} offset="8">
          <IressPlaceholder>8</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} offset="9">
          <IressPlaceholder>9</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} offset="10">
          <IressPlaceholder>10</IressPlaceholder>
        </IressCol>
      </IressRow>
      <IressRow {...row}>
        <IressCol {...column} offset="11">
          <IressPlaceholder>11</IressPlaceholder>
        </IressCol>
      </IressRow>
    </IressStack>
  ),
};

export const ResponsiveOffset: Story = {
  ...Default,
  args: {
    ...Default.args,
    columns: [
      {
        offset: {
          md: 5,
          lg: 2,
        },
      },
    ],
  },
  argTypes: {
    ...removeArgTypes(['numberOfColumns', 'offset']),
    columns: columnsArgType,
  },
  render: ({ row, columns = [], ...columnProps }) => (
    <IressStack gap="spacing.400">
      <IressPanel>
        Current breakpoint: <CurrentBreakpoint />.
      </IressPanel>

      <IressRow {...row}>
        {columns.map((column, index) => (
          <IressCol {...columnProps} {...column} key={index}>
            <IressPlaceholder>
              <IressText textAlign="center">
                Column {index + 1}
                <br />
                {column.offset && JSON.stringify(column.offset)}
              </IressText>
            </IressPlaceholder>
          </IressCol>
        ))}
      </IressRow>
    </IressStack>
  ),
};

export const AlignSelf: Story = {
  ...Default,
  argTypes: {
    ...removeArgTypes(['numberOfColumns', 'alignSelf']),
  },
  render: ({ row, ...column }) => (
    <IressContainer>
      <IressRow
        {...row}
        layerStyle="elevation.raised"
        style={{ height: '10rem' }}
      >
        <IressCol {...column} alignSelf="start">
          <IressPlaceholder>Start</IressPlaceholder>
        </IressCol>
        <IressCol {...column} alignSelf="center">
          <IressPlaceholder>Center</IressPlaceholder>
        </IressCol>
        <IressCol {...column} alignSelf="end">
          <IressPlaceholder>End</IressPlaceholder>
        </IressCol>
        <IressCol {...column} alignSelf="stretch">
          <IressPlaceholder stretch>Stretch</IressPlaceholder>
        </IressCol>
      </IressRow>
    </IressContainer>
  ),
};
