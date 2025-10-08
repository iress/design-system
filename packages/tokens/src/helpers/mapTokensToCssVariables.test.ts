import { Type } from '../enums';
import { type IressTokenSchema } from '../types';
import { mapTokensToCssVariables } from './mapTokensToCssVariables';

const designTokens: IressTokenSchema = {
  colour: {
    neutral: {
      10: {
        $description:
          'Used as the default background colour for most components. For tooltips, it is used as the foreground colour for the tooltip content.',
        $type: Type.Color,
        $value: '#FFFFFF',
      },
    },
  },
  elevation: {
    raised: {
      $description:
        'Raised elevations sit slightly higher than default elevations. They are reserved for cards that can be moved, such as Jira issue cards and Trello cards. In special circumstances, they can be used for cards as a way to provide additional heirarchy or emphasis.',
      shadow: {
        $description: 'Shadow for raised elevations',
        $type: Type.Shadow,
        $value: {
          color: '#091E4220',
          offsetX: '0px',
          offsetY: '3px',
          blur: '5px',
        },
      },
      border: {
        $description: 'Border for raised elevations',
        $type: Type.Border,
        $value: {
          color: '#091E4220',
          width: '0.5px',
          style: 'solid',
        },
      },
    },
  },
  radius: {
    system: {
      button: {
        $description:
          'Applies to buttons and other interactive elements such as the hover state of links.',
        $type: Type.Radius,
        $value: {
          topLeft: '{radius.075 || calc(0.75 * 1rem)}',
          topRight: '{radius.075 || calc(0.75 * 1rem)}',
          bottomRight: '{radius.075 || calc(0.75 * 1rem)}',
          bottomLeft: '{radius.075 || calc(0.75 * 1rem)}',
        },
      },
    },
  },
};

describe('mapTokensToCssVariables', () => {
  it('converts the schema into a map of css variables, including fallbacks', async () => {
    const cssVariables = mapTokensToCssVariables(designTokens);
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: 'var(--iress-colour-neutral-10, #FFFFFF)',
        },
      },
      elevation: {
        raised: {
          border: 'var(--iress-elevation-raised-border, 0.5px solid #091E4220)',
          shadow: 'var(--iress-elevation-raised-shadow, 0px 3px 5px #091E4220)',
        },
      },
      radius: {
        system: {
          button:
            'var(--iress-radius-system-button, var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)))',
        },
      },
    });
  });

  it('throws an error if there is a token/group with a dot', async () => {
    expect(() =>
      mapTokensToCssVariables({
        'invalid.token': {
          $type: Type.Color,
          $value: '#000',
        },
      } as never),
    ).toThrow(
      'Paths with dots are not allowed in the token schema, as we need to support dot notation to allow accessing token values. Please rename the path: invalid.token. Complete path: invalid.token',
    );
  });

  it('throws an error with complete path for nested tokens with dots', async () => {
    expect(() =>
      mapTokensToCssVariables({
        colour: {
          'invalid.nested': {
            $type: Type.Color,
            $value: '#000',
          },
        },
      } as never),
    ).toThrow(
      'Paths with dots are not allowed in the token schema, as we need to support dot notation to allow accessing token values. Please rename the path: invalid.nested. Complete path: colour.invalid.nested',
    );
  });

  it('ignores properties that start with $ when iterating', async () => {
    const tokensWithDollarProps = {
      colour: {
        $customProperty: 'should be ignored',
        $anotherCustom: {
          nested: 'also ignored',
        },
        neutral: {
          10: {
            $type: Type.Color,
            $value: '#FFFFFF',
          },
        },
      },
    };

    const cssVariables = mapTokensToCssVariables(tokensWithDollarProps);
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: 'var(--iress-colour-neutral-10, #FFFFFF)',
        },
      },
    });
  });

  it('generates CSS variables without fallbacks when noFallbacks option is true', async () => {
    const cssVariables = mapTokensToCssVariables(designTokens, {
      noFallbacks: true,
    });
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: '#FFFFFF',
        },
      },
      elevation: {
        raised: {
          border: '0.5px solid #091E4220',
          shadow: '0px 3px 5px #091E4220',
        },
      },
      radius: {
        system: {
          button:
            'var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem))',
        },
      },
    });
  });

  it('generates CSS variables with empty values when emptyVariables option is true', async () => {
    const cssVariables = mapTokensToCssVariables(designTokens, {
      emptyVariables: true,
    });
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: '',
        },
      },
      elevation: {
        raised: {
          border: '0.5px solid #091E4220',
          shadow: '0px 3px 5px #091E4220',
        },
      },
      radius: {
        system: {
          button:
            'var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem))',
        },
      },
    });
  });

  it('generates CSS variables with empty values when both noFallbacks and emptyVariables are true', async () => {
    const cssVariables = mapTokensToCssVariables(designTokens, {
      noFallbacks: true,
      emptyVariables: true,
    });
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: '',
        },
      },
      elevation: {
        raised: {
          border: '0.5px solid #091E4220',
          shadow: '0px 3px 5px #091E4220',
        },
      },
      radius: {
        system: {
          button:
            'var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem))',
        },
      },
    });
  });

  it('generates composite token variables when addCompositeTokens option is true', async () => {
    const cssVariables = mapTokensToCssVariables(designTokens, {
      addCompositeTokens: true,
    });
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: 'var(--iress-colour-neutral-10, #FFFFFF)',
        },
      },
      elevation: {
        raised: {
          border: 'var(--iress-elevation-raised-border, 0.5px solid #091E4220)',
          shadow: 'var(--iress-elevation-raised-shadow, 0px 3px 5px #091E4220)',
          _border: {
            color: 'var(--iress-elevation-raised--border-color, #091E4220)',
            style: 'var(--iress-elevation-raised--border-style, solid)',
            width: 'var(--iress-elevation-raised--border-width, 0.5px)',
          },
          _shadow: {
            blur: 'var(--iress-elevation-raised--shadow-blur, 5px)',
            color: 'var(--iress-elevation-raised--shadow-color, #091E4220)',
            offsetX: 'var(--iress-elevation-raised--shadow-offset-x, 0px)',
            offsetY: 'var(--iress-elevation-raised--shadow-offset-y, 3px)',
            spread: 'var(--iress-elevation-raised--shadow-spread)',
          },
        },
      },
      radius: {
        system: {
          button:
            'var(--iress-radius-system-button, var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)))',
          _button: {
            bottomLeft:
              'var(--iress-radius-system--button-bottom-left, var(--iress-radius-075, calc(0.75 * 1rem)))',
            bottomRight:
              'var(--iress-radius-system--button-bottom-right, var(--iress-radius-075, calc(0.75 * 1rem)))',
            topLeft:
              'var(--iress-radius-system--button-top-left, var(--iress-radius-075, calc(0.75 * 1rem)))',
            topRight:
              'var(--iress-radius-system--button-top-right, var(--iress-radius-075, calc(0.75 * 1rem)))',
          },
        },
      },
    });
  });

  it('generates CSS variables with custom values when customValues option is provided', async () => {
    const customValues = {
      colour: {
        neutral: {
          10: {
            $value: '#000000' as const,
          },
        },
      },
      elevation: {
        raised: {
          shadow: {
            $value: {
              color: '#00000040' as const,
              offsetX: '2px' as const,
              offsetY: '4px' as const,
              blur: '8px' as const,
            },
          },
          border: {
            $value: {
              color: '#00000040' as const,
              width: '1px' as const,
              style: 'solid' as const,
            },
          },
        },
      },
      radius: {
        system: {
          button: {
            $value: {
              topLeft: '4px' as const,
              topRight: '4px' as const,
              bottomRight: '4px' as const,
              bottomLeft: '4px' as const,
            },
          },
        },
      },
    };

    const cssVariables = mapTokensToCssVariables(designTokens, {
      customValues: customValues as unknown as typeof designTokens,
    });
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: 'var(--iress-colour-neutral-10, #000000)',
        },
      },
      elevation: {
        raised: {
          border: 'var(--iress-elevation-raised-border, 1px solid #00000040)',
          shadow: 'var(--iress-elevation-raised-shadow, 2px 4px 8px #00000040)',
        },
      },
      radius: {
        system: {
          button: 'var(--iress-radius-system-button, 4px 4px 4px 4px)',
        },
      },
    });
  });

  it('generates CSS variables with custom values and addCompositeTokens option', async () => {
    const customValues = {
      elevation: {
        raised: {
          shadow: {
            $value: {
              color: '#FF000040' as const,
              offsetX: '1px' as const,
              offsetY: '2px' as const,
              blur: '3px' as const,
            },
          },
        },
      },
    };

    const cssVariables = mapTokensToCssVariables(designTokens, {
      customValues: customValues as unknown as Partial<typeof designTokens>,
      addCompositeTokens: true,
    });
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: 'var(--iress-colour-neutral-10, #FFFFFF)',
        },
      },
      elevation: {
        raised: {
          border: 'var(--iress-elevation-raised-border, 0.5px solid #091E4220)',
          shadow: 'var(--iress-elevation-raised-shadow, 1px 2px 3px #FF000040)',
          _border: {
            color: 'var(--iress-elevation-raised--border-color, #091E4220)',
            style: 'var(--iress-elevation-raised--border-style, solid)',
            width: 'var(--iress-elevation-raised--border-width, 0.5px)',
          },
          _shadow: {
            blur: 'var(--iress-elevation-raised--shadow-blur, 3px)',
            color: 'var(--iress-elevation-raised--shadow-color, #FF000040)',
            offsetX: 'var(--iress-elevation-raised--shadow-offset-x, 1px)',
            offsetY: 'var(--iress-elevation-raised--shadow-offset-y, 2px)',
            spread: 'var(--iress-elevation-raised--shadow-spread)',
          },
        },
      },
      radius: {
        system: {
          button:
            'var(--iress-radius-system-button, var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)))',
          _button: {
            bottomLeft:
              'var(--iress-radius-system--button-bottom-left, var(--iress-radius-075, calc(0.75 * 1rem)))',
            bottomRight:
              'var(--iress-radius-system--button-bottom-right, var(--iress-radius-075, calc(0.75 * 1rem)))',
            topLeft:
              'var(--iress-radius-system--button-top-left, var(--iress-radius-075, calc(0.75 * 1rem)))',
            topRight:
              'var(--iress-radius-system--button-top-right, var(--iress-radius-075, calc(0.75 * 1rem)))',
          },
        },
      },
    });
  });

  it('generates CSS variables with custom values and noFallbacks option', async () => {
    const customValues = {
      colour: {
        neutral: {
          10: {
            $value: '#CCCCCC' as const,
          },
        },
      },
    };

    const cssVariables = mapTokensToCssVariables(designTokens, {
      customValues: customValues as unknown as Partial<typeof designTokens>,
      noFallbacks: true,
    });
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: '#CCCCCC',
        },
      },
      elevation: {
        raised: {
          border: '0.5px solid #091E4220',
          shadow: '0px 3px 5px #091E4220',
        },
      },
      radius: {
        system: {
          button:
            'var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem))',
        },
      },
    });
  });

  it('generates CSS variables with custom values and emptyVariables option', async () => {
    const customValues = {
      colour: {
        neutral: {
          10: {
            $value: '#AAAAAA' as const,
          },
        },
      },
    };

    const cssVariables = mapTokensToCssVariables(designTokens, {
      customValues: customValues as unknown as Partial<typeof designTokens>,
      emptyVariables: true,
    });
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: '#AAAAAA',
        },
      },
      elevation: {
        raised: {
          border: '0.5px solid #091E4220',
          shadow: '0px 3px 5px #091E4220',
        },
      },
      radius: {
        system: {
          button:
            'var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem))',
        },
      },
    });
  });

  it('handles readonly tokens correctly', async () => {
    const readonlyTokens = {
      colour: {
        neutral: {
          10: {
            $description:
              'Used as the default background colour for most components.',
            $type: Type.Color,
            $value: '#FFFFFF',
            $extensions: {
              'iress.readonly': true,
            },
          },
        },
      },
    };

    const cssVariables = mapTokensToCssVariables(readonlyTokens);
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: '#FFFFFF',
        },
      },
    });
  });

  it('handles readonly tokens with noFallbacks option', async () => {
    const readonlyTokens = {
      colour: {
        neutral: {
          10: {
            $description:
              'Used as the default background colour for most components.',
            $type: Type.Color,
            $value: '#FFFFFF',
            $extensions: {
              'iress.readonly': true,
            },
          },
        },
      },
    };

    const cssVariables = mapTokensToCssVariables(readonlyTokens, {
      noFallbacks: true,
    });
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: '#FFFFFF',
        },
      },
    });
  });

  it('handles tokens with $value but no $type', async () => {
    const tokensWithValueOnly = {
      colour: {
        neutral: {
          10: {
            $description:
              'Used as the default background colour for most components.',
            $value: '#FFFFFF',
          },
        },
      },
    };

    const cssVariables = mapTokensToCssVariables(tokensWithValueOnly);
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: 'var(--iress-colour-neutral-10, #FFFFFF)',
        },
      },
    });
  });

  it('replaces empty custom values with fallbacks when replaceEmptyValuesWithFallbacks option is true', async () => {
    const customValues = {
      colour: {
        neutral: {
          10: {
            $value: '' as const, // Empty value
          },
        },
      },
      elevation: {
        raised: {
          shadow: {
            $value: {
              color: '#FF000040' as const,
              offsetX: '1px' as const,
              offsetY: '2px' as const,
              blur: '3px' as const,
            },
          },
        },
      },
    };

    const cssVariables = mapTokensToCssVariables(designTokens, {
      customValues: customValues as unknown as Partial<typeof designTokens>,
      replaceEmptyValuesWithFallbacks: true,
    });
    expect(cssVariables).toStrictEqual({
      colour: {
        neutral: {
          10: 'var(--iress-colour-neutral-10, #FFFFFF)', // Should use original token value
        },
      },
      elevation: {
        raised: {
          border: 'var(--iress-elevation-raised-border, 0.5px solid #091E4220)',
          shadow: 'var(--iress-elevation-raised-shadow, 1px 2px 3px #FF000040)', // Should use custom value
        },
      },
      radius: {
        system: {
          button:
            'var(--iress-radius-system-button, var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)) var(--iress-radius-075, calc(0.75 * 1rem)))',
        },
      },
    });
  });
});
