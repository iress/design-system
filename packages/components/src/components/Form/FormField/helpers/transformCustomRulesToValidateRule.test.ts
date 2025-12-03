import { transformCustomRulesToValidateRule } from './transformCustomRulesToValidateRule';
import {
  type FieldName,
  type FieldPathValue,
  type FieldValues,
  type Validate,
} from 'react-hook-form';

type RulesValidateObject = Record<
  string,
  Validate<FieldPathValue<FieldValues, FieldName<FieldValues>>, FieldValues>
>;

describe('transformCustomRulesToValidateRule', () => {
  it('NEGATIVE TEST: No error when validate is a function but NO custom rules', () => {
    expect(() =>
      transformCustomRulesToValidateRule({
        validate: () => true,
      }),
    ).not.toThrow();
  });

  it('POSITIVE TEST: Throws error when validate is a function AND custom rules exist', () => {
    expect(() =>
      transformCustomRulesToValidateRule({
        validate: () => true,
        email: true,
      }),
    ).toThrow(
      'IressForm: To use custom IDS rules, the validate prop must be an object.',
    );

    expect(() =>
      transformCustomRulesToValidateRule({
        validate: () => true,
        minDate: new Date('2021-01-01'),
      }),
    ).toThrow(
      'IressForm: To use custom IDS rules, the validate prop must be an object.',
    );
  });

  it('NEGATIVE TEST: No error when validate is an object WITH custom rules', () => {
    expect(() =>
      transformCustomRulesToValidateRule({
        validate: {
          custom: () => true,
        },
        email: true,
      }),
    ).not.toThrow();
  });

  it('returns the default rules if no custom rules are provided', () => {
    const rules = transformCustomRulesToValidateRule({});
    expect(rules).toStrictEqual({
      validate: {},
    });
  });

  it('validates email addresses', () => {
    const rules = transformCustomRulesToValidateRule({
      email: true,
    });
    expect(rules).toStrictEqual({
      validate: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        email: expect.any(Function),
      },
    });

    const validateRules = rules?.validate as RulesValidateObject;

    expect(validateRules.email('hello', {})).toBe(false);
    expect(validateRules.email('a@b.com', {})).toBe(true);

    const customMessageRules = transformCustomRulesToValidateRule({
      email: 'Custom message',
    });

    const customMessageValidateRules =
      customMessageRules?.validate as RulesValidateObject;

    expect(customMessageValidateRules.email('a@b.com', {})).toBe(true);
    expect(customMessageValidateRules.email('hello', {})).toBe(
      'Custom message',
    );
  });

  it('returns the default rules with custom minDate rule', () => {
    const rules = transformCustomRulesToValidateRule({
      minDate: new Date('2021-01-01'),
    });
    expect(rules).toStrictEqual({
      validate: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        minDate: expect.any(Function),
      },
    });

    const validateRules = rules?.validate as RulesValidateObject;

    expect(validateRules.minDate('2021-01-01', {})).toBe(true);
    expect(validateRules.minDate('2022-01-01', {})).toBe(true);
    expect(validateRules.minDate('2020-01-01', {})).toBe(false);

    const customMessageRules = transformCustomRulesToValidateRule({
      minDate: {
        value: new Date('2021-01-01'),
        message: 'Custom message',
      },
    });

    const customMessageValidateRules =
      customMessageRules?.validate as RulesValidateObject;

    expect(customMessageValidateRules.minDate('2021-01-01', {})).toBe(true);
    expect(customMessageValidateRules.minDate('2022-01-01', {})).toBe(true);
    expect(customMessageValidateRules.minDate('2020-01-01', {})).toBe(
      'Custom message',
    );
  });

  it('returns the default rules with custom maxDate rule', () => {
    const rules = transformCustomRulesToValidateRule({
      maxDate: new Date('2021-01-01'),
    });
    expect(rules).toStrictEqual({
      validate: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        maxDate: expect.any(Function),
      },
    });

    const validateRules = rules?.validate as RulesValidateObject;

    expect(validateRules.maxDate('2021-01-01', {})).toBe(true);
    expect(validateRules.maxDate('2022-01-01', {})).toBe(false);
    expect(validateRules.maxDate('2020-01-01', {})).toBe(true);

    const customMessageRules = transformCustomRulesToValidateRule({
      maxDate: {
        value: new Date('2021-01-01'),
        message: 'Custom message',
      },
    });

    const customMessageValidateRules =
      customMessageRules?.validate as RulesValidateObject;

    expect(customMessageValidateRules.maxDate('2021-01-01', {})).toBe(true);
    expect(customMessageValidateRules.maxDate('2022-01-01', {})).toBe(
      'Custom message',
    );
    expect(customMessageValidateRules.maxDate('2020-01-01', {})).toBe(true);
  });
});
