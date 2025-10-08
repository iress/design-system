import { type Transform } from 'style-dictionary/types';
import { transformTypes } from 'style-dictionary/enums';
import { Type } from '../enums';
import { type IressDesignToken, type CompositeValue } from '../interfaces';
import { get, shake } from 'radash';
import { convertReferencesToVariables } from '../helpers/convertReferencesToVariables';

/**
 * This transform generates a shadow token, but with fallbacks from the default token.
 * Mostly copied from: https://github.com/style-dictionary/style-dictionary/blob/main/lib/common/transforms.js#L1343
 */
export const shadowCssShorthand: Transform = {
  name: 'shadow/css/shorthand',
  type: transformTypes.value,
  transitive: true,
  filter: (token, options) => {
    const tokenType = options.usesDtcg ? token.$type : token.type;

    if (!tokenType && options.tokens) {
      const foundToken = get<IressDesignToken>(
        options.tokens,
        token.path.join('.'),
      );

      return foundToken?.$type === Type.Shadow;
    }

    return tokenType === Type.Shadow;
  },
  transform: (token, _, options) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Value can be anything
    const value = options.usesDtcg ? token.$value : token.value;
    const schema = options.tokens;

    if (typeof value === 'string') {
      // already transformed to string
      return value;
    }

    const typedValue = value as CompositeValue['shadow'];
    let tokenPath = [...token.path];

    if (tokenPath[0] === 'subThemes') {
      tokenPath = tokenPath.slice(2);
    }

    const defaultToken = get<IressDesignToken<CompositeValue['shadow']>>(
      schema,
      tokenPath.join('.'),
    );

    const stringifyShadow = (
      shadow: CompositeValue['shadow'],
      index?: number,
    ) => {
      // check if the shadows are objects, they might already be transformed to strings if they were refs
      if (typeof shadow !== 'object') {
        return shadow;
      }

      let defaultValue: CompositeValue['shadow'] | undefined;

      if (defaultToken) {
        defaultValue = (
          Array.isArray(defaultToken.$value)
            ? defaultToken.$value[index ?? 0]
            : defaultToken.$value
        ) as CompositeValue['shadow'];
      }

      const {
        type = convertReferencesToVariables(defaultValue?.type),
        color = convertReferencesToVariables(defaultValue?.color),
        offsetX = convertReferencesToVariables(defaultValue?.offsetX),
        offsetY = convertReferencesToVariables(defaultValue?.offsetY),
        blur = convertReferencesToVariables(defaultValue?.blur),
        spread = convertReferencesToVariables(defaultValue?.spread),
      } = shake(shadow, (value) => !value) as CompositeValue['shadow'];

      return [
        type,
        offsetX ?? 0,
        offsetY ?? 0,
        blur,
        spread,
        color ?? `#000000`,
      ]
        .filter((value) => !!value || value === 0)
        .join(' ')
        .trim();
    };

    if (Array.isArray(typedValue)) {
      return typedValue.map(stringifyShadow).join(', ');
    }

    return stringifyShadow(typedValue);
  },
};
