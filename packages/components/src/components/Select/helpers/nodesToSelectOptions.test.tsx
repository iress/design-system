import {
  mapNodesToSelectOptions,
  findValueFromStringInSelectOptions,
} from './nodesToSelectOptions';
import { IressSelectOption } from '..';

describe('mapNodesToSelectOptions', () => {
  it('returns empty array if no nodes', () => {
    const options = mapNodesToSelectOptions(<></>);
    expect(options).toHaveLength(0);
  });

  it('returns empty array if no options or optgroup', () => {
    const options = mapNodesToSelectOptions(<strong>Hello</strong>);
    expect(options).toHaveLength(0);
  });

  it('converts a single set of option elements to SelectOption[]', () => {
    const options = mapNodesToSelectOptions(<option value="2">Two</option>);

    expect(options).toHaveLength(1);
    expect(options[0].label).toBe('Two');
    expect(options[0].value).toBe('2');
  });

  it('converts a single set of IressSelectOptions elements to SelectOption[]', () => {
    const options = mapNodesToSelectOptions(
      <IressSelectOption value={2}>Two</IressSelectOption>,
    );

    expect(options).toHaveLength(1);
    expect(options[0].label).toBe('Two');
    expect(options[0].value).toBe(2);
  });

  it('converts a flat set of option elements to SelectOption[]', () => {
    const fn = vitest.fn();
    const options = mapNodesToSelectOptions(
      <>
        <option value="1">One</option>
        <option value="2" onClick={fn}>
          Two
        </option>
        <option value="3">Three</option>
      </>,
    );

    expect(options).toHaveLength(3);
    expect(options).toStrictEqual([
      {
        label: 'One',
        value: '1',
      },
      {
        label: 'Two',
        value: '2',
        onClick: fn,
      },
      {
        label: 'Three',
        value: '3',
      },
    ]);
  });

  it('converts a tree set of option elements to SelectOption[]', () => {
    const fn = vitest.fn();
    const options = mapNodesToSelectOptions(
      <optgroup label="Group 1">
        <option value="1">One</option>
        <option value="2" onClick={fn}>
          Two
        </option>
        <option value="3">Three</option>
      </optgroup>,
    );

    expect(options).toHaveLength(1);
    expect(options[0].children).toHaveLength(3);

    expect(options).toStrictEqual([
      {
        label: 'Group 1',
        children: [
          {
            label: 'One',
            value: '1',
          },
          {
            label: 'Two',
            value: '2',
            onClick: fn,
          },
          {
            label: 'Three',
            value: '3',
          },
        ],
      },
    ]);
  });
});

describe('findValueFromStringInSelectOptions', () => {
  const items = [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: 2,
    },
  ];

  const groupedItems = [
    {
      label: 'Group',
      children: [
        {
          label: 'Option 1',
          value: '1',
        },
        {
          label: 'Option 2',
          value: 2,
        },
      ],
    },
  ];

  it('returns undefined if empty array passed in', () => {
    expect(findValueFromStringInSelectOptions('1', [])).toBe(undefined);
  });

  it('returns undefined if not found in flat items', () => {
    expect(
      findValueFromStringInSelectOptions<number | string>('4', items),
    ).toBe(undefined);
  });

  it('returns undefined if not found in grouped items', () => {
    expect(
      findValueFromStringInSelectOptions<number | string>('4', groupedItems),
    ).toBe(undefined);
  });

  it('returns value if found in flat items', () => {
    expect(
      findValueFromStringInSelectOptions<number | string>('2', items),
    ).toBe(2);
  });

  it('returns value if found in grouped items', () => {
    expect(
      findValueFromStringInSelectOptions<number | string>('2', groupedItems),
    ).toBe(2);
  });
});
