import { isValidFormInputElement } from './isValidFormInputElement';

describe('isValidFormInputElement', () => {
  it('returns true if passed in a select (not disabled)', () => {
    const select = document.createElement('select');
    expect(isValidFormInputElement(select)).toBe(true);
  });

  it('returns false if passed in a disabled select', () => {
    const select = document.createElement('select');
    select.disabled = true;
    expect(isValidFormInputElement(select)).toBe(false);
  });

  it('returns false if passed an input with no name', () => {
    const input = document.createElement('input');
    expect(isValidFormInputElement(input)).toBe(false);
  });

  it('returns true if passed an input with a name', () => {
    const input = document.createElement('input');
    input.name = 'name';
    expect(isValidFormInputElement(input)).toBe(true);
  });

  it('returns false if passed a disabled input', () => {
    const input = document.createElement('input');
    input.name = 'name';
    input.disabled = true;
    expect(isValidFormInputElement(input)).toBe(false);
  });

  const validTypeArr = [
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ];
  it.each(validTypeArr)('returns true if passed a %s input', (type) => {
    const input = document.createElement('input');
    input.name = 'name';
    input.type = type;
    expect(isValidFormInputElement(input)).toBe(true);
  });

  const invalidTypeArr = ['file', 'reset', 'submit', 'button'];
  it.each(invalidTypeArr)('returns false if passed a %s input', (type) => {
    const input = document.createElement('input');
    input.name = 'name';
    input.type = type;
    expect(isValidFormInputElement(input)).toBe(false);
  });
});
