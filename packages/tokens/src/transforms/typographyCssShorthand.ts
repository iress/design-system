import { type Transform } from 'style-dictionary/types';
import { transformTypes } from 'style-dictionary/enums';
import { Type } from '../enums';
import { type IressDesignToken, type CompositeValue } from '../interfaces';
import { get, shake } from 'radash';
import { convertReferencesToVariables } from '../helpers/convertReferencesToVariables';

/**
 * This transform generates a typography token, but with fallbacks from the default token.
 * Mostly copied from: https://github.com/amzn/style-dictionary/blob/main/lib/common/transforms.js#L1258
 */
export const typographyCssShorthand: Transform = {
  name: 'typography/css/shorthand',
  type: transformTypes.value,
  transitive: true,
  filter: (token, options) => {
    const tokenType = options.usesDtcg ? token.$type : token.type;

    if (!tokenType && options.tokens) {
      const foundToken = get<IressDesignToken>(
        options.tokens,
        token.path.join('.'),
      );

      return foundToken?.$type === Type.Typography;
    }

    return tokenType === Type.Typography;
  },
  transform: (token, _, options) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Value can be anything
    const value = options.usesDtcg ? token.$value : token.value;
    const schema = options.tokens;

    if (typeof value !== 'object' || !schema) {
      // already transformed to string
      return String(value);
    }

    const typedValue = value as CompositeValue['typography'];
    let tokenPath = [...token.path];

    if (tokenPath[0] === 'subThemes') {
      tokenPath = tokenPath.slice(2);
    }

    const defaultToken = get<IressDesignToken<CompositeValue['typography']>>(
      schema,
      tokenPath.join('.'),
    );
    const {
      fontFamily = convertReferencesToVariables(defaultToken.$value.fontFamily),
      fontWeight = convertReferencesToVariables(defaultToken.$value.fontWeight),
      fontVariant = convertReferencesToVariables(
        defaultToken.$value.fontVariant,
      ),
      fontWidth = convertReferencesToVariables(defaultToken.$value.fontWidth),
      fontSize = convertReferencesToVariables(defaultToken.$value.fontSize),
      fontStyle = convertReferencesToVariables(defaultToken.$value.fontStyle),
      lineHeight = convertReferencesToVariables(defaultToken.$value.lineHeight),
    } = shake(typedValue, (value) => !value) as CompositeValue['typography'];

    return [
      fontStyle,
      fontVariant,
      fontWeight,
      fontWidth,
      `${fontSize} / ${lineHeight}`,
      fontFamily,
    ]
      .filter((value) => !!value)
      .join(' ')
      .trim();
  },
};
