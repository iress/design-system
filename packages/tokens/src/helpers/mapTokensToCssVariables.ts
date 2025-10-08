import { type IressDesignToken, type CSSVariablesMap } from '../interfaces';
import { assign, get } from 'radash';
import { getCssVariable } from './getCssVariable';
import {
  COMPOSITE_TOKENS,
  getCompositeValueFromToken,
} from './getCompositeValueFromToken';
import { getTransformedFallback } from './getTransformedFallback';
import { getEmptyVariableForToken } from './getEmptyVariableForToken';

export interface MapTokensToCssVariablesOptions<T extends object> {
  /**
   * If true, composite tokens (tokens with multiple values, such as shadows and borders) will have CSS variables generated for each individual value as well as the shorthand. This is useful for allowing more granular control over the individual values of a compound token.
   * Used in Styler to allow previews individual shadow and border values.
   */
  addCompositeTokens?: boolean;

  /**
   * Custom values to use instead of the token values. This is useful for generating CSS variables for a specific theme.
   * Used in Styler to generate CSS variables for the current theme being edited.
   */
  customValues?: T;

  /**
   * If true, the CSS variables will be empty strings or empty objects/arrays instead of using the token values. This is useful for generating a base stylesheet that can be filled in later.
   * Used in Styler to generate a blank theme.
   */
  emptyVariables?: boolean;

  /**
   * If true, the CSS variables will not have fallbacks. This is useful for generating a stylesheet that does not rely on the default theme.
   * Used in Styler to generate a blank theme.
   */
  noFallbacks?: boolean;

  /**
   * The prefix to add to CSS variables, defaults to `iress`.
   * Used in Styler to have a different set of variables for previewing items within the theme editor.
   */
  prefix?: string;

  /**
   * This replaces empty values with the fallbacks directly.
   * Used in Styler to work out contrast ratio feedback.
   */
  replaceEmptyValuesWithFallbacks?: boolean;
}

export const mapTokensToCssVariables = <T extends object>(
  schema: T,
  options: MapTokensToCssVariablesOptions<T> = {},
) => {
  let cssVariables: CSSVariablesMap = {};
  let currentPath: string[] = [];
  let readonly: boolean[] = [];

  // This function iterates over the schema and maps the tokens to CSS variables based on the currentPath
  const iterate = (schemaItem: T) => {
    for (const [path, value] of Object.entries(schemaItem)) {
      // If the value is not an object or is null, it means we are inside a token, so we skip it
      if (typeof value !== 'object' || value === null) {
        continue;
      }

      const token = value as IressDesignToken;

      // We update the current path of the token, as well as the token group readonly status
      currentPath = [...currentPath, path];
      readonly = [...readonly, token.$extensions?.['iress.readonly'] ?? false];
      throwErrorIfKeyContainsDots(path, currentPath);

      // If the token has a type, it means it is a token, so we map it to a CSS variable
      if ('$type' in token || '$value' in token) {
        // If the token or any of its groups are readonly, we set the readonly flag to true
        const isReadonly =
          (readonly.includes(true) || options.noFallbacks) ??
          options.emptyVariables;

        cssVariables = assign(
          cssVariables,
          getMapFromToken(schema, token, currentPath, isReadonly, options),
        );
      } else if (!path.startsWith('$')) {
        // If the token does not have a type, it means it is a group, so we iterate over it
        iterate(value as T);
      }

      // We remove the last path element to go back to the parent token
      currentPath.pop();
      readonly.pop();
    }
  };

  // We start the iteration at the top level separately so we can restart the path
  for (const [path, value] of Object.entries(schema)) {
    currentPath = [path];
    readonly = [
      (value as IressDesignToken).$extensions?.['iress.readonly'] ?? false,
    ];
    throwErrorIfKeyContainsDots(path, currentPath);
    iterate(value as T);
  }

  return cssVariables;
};

// This function iterates over the token to create a nested object of a single token
// This gets around the `set` in radash not allowing numbers in the path, as numbers are used to set arrays
const getMapFromToken = <T extends object>(
  schema: T,
  token: IressDesignToken,
  path: string[],
  readonly = false,
  options?: MapTokensToCssVariablesOptions<T>,
) => {
  const tokenMap: CSSVariablesMap = {};
  let currentMap: CSSVariablesMap = tokenMap;
  const tokenLimit = path.length;
  let customToken = token;

  if (options?.emptyVariables) {
    customToken = {
      ...token,
      $value: getEmptyVariableForToken(token) as never,
    };
  }

  if (options?.customValues) {
    customToken = {
      ...token,
      $value: get(
        options.customValues,
        `${path.join('.')}.$value`,
        token.$value,
      ),
    };

    if (!customToken.$value && options.replaceEmptyValuesWithFallbacks) {
      customToken.$value = token.$value;
    }
  }

  for (let i = 0; i < tokenLimit; i++) {
    if (i === tokenLimit - 1) {
      currentMap[path[i]] = getCssValueFromToken(
        schema,
        customToken,
        path,
        readonly,
        options?.prefix,
      );

      if (
        options?.addCompositeTokens &&
        COMPOSITE_TOKENS.includes(token.$type)
      ) {
        currentMap[`_${path[i]}`] = getCompositeValueFromToken(
          schema,
          customToken,
          path,
          readonly,
          options?.prefix,
        );
      }
    } else {
      currentMap[path[i]] = {};
      currentMap = currentMap[path[i]] as CSSVariablesMap;
    }
  }

  return tokenMap;
};

const getCssValueFromToken = <T extends object>(
  schema: T,
  token: IressDesignToken,
  path: string[],
  readonly = false,
  prefix?: string,
) => {
  if (readonly) {
    return getTransformedFallback(schema, token, path, prefix) ?? '';
  }

  return getCssVariable(
    path,
    getTransformedFallback(schema, token, path, prefix),
    prefix,
  );
};

const throwErrorIfKeyContainsDots = (key: string, completePath?: string[]) => {
  if (key.includes('.')) {
    throw new Error(
      `Paths with dots are not allowed in the token schema, as we need to support dot notation to allow accessing token values. Please rename the path: ${key}. Complete path: ${completePath?.join('.')}`,
    );
  }
};
