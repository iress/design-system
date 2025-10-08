import { type Transform } from 'style-dictionary/types';
import { transformTypes } from 'style-dictionary/enums';
import { Type } from '../enums';
import { type IressDesignToken, type CompositeValue } from '../interfaces';
import { convertReferencesToVariables } from '../helpers/convertReferencesToVariables';
import { get, shake } from 'radash';

/**
 * This transform generates a border token, but with fallbacks from the default token.
 * Mostly copied from: https://github.com/style-dictionary/style-dictionary/blob/main/lib/common/transforms.js#L1218
 */
export const borderCssShorthand: Transform = {
  name: 'border/css/shorthand',
  type: transformTypes.value,
  transitive: true,
  filter: (token, options) => {
    const tokenType = options.usesDtcg ? token.$type : token.type;

    if (!tokenType && options.tokens) {
      const foundToken = options.tokens[
        token.path.join('.')
      ] as IressDesignToken;

      return foundToken?.$type === Type.Border;
    }

    return tokenType === Type.Border;
  },
  transform: (token, _, options) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Value can be anything
    const value = options.usesDtcg ? token.$value : token.value;
    const schema = options.tokens;

    // If value is already a string, return it
    if (typeof value === 'string') {
      return value;
    }

    // If value is not an object, convert to string
    if (typeof value !== 'object' || value === null) {
      return String(value);
    }

    const typedValue = value as CompositeValue['border'];
    let tokenPath = [...token.path];

    if (tokenPath[0] === 'subThemes') {
      tokenPath = tokenPath.slice(2);
    }

    const defaultToken = get<IressDesignToken<CompositeValue['border']>>(
      schema,
      tokenPath.join('.'),
    );

    const {
      width = convertReferencesToVariables(defaultToken?.$value.width),
      style = convertReferencesToVariables(defaultToken?.$value.style),
      color = convertReferencesToVariables(defaultToken?.$value.color),
    } = shake(typedValue, (value) => !value) as CompositeValue['border'];

    return [width, style, color]
      .filter((value) => !!value)
      .join(' ')
      .trim();
  },
};
