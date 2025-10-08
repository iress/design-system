import { type Transform } from 'style-dictionary/types';
import { transformTypes } from 'style-dictionary/enums';
import { Type } from '../enums';
import { type IressDesignToken, type CompositeValue } from '../interfaces';
import { get, shake } from 'radash';
import { convertReferencesToVariables } from '../helpers/convertReferencesToVariables';

export const radiusCssShorthand: Transform = {
  name: 'radius/css/shorthand',
  type: transformTypes.value,
  transitive: true,
  filter: (token, options) => {
    const tokenType = options.usesDtcg ? token.$type : token.type;

    if (!tokenType && options.tokens) {
      const foundToken = get<IressDesignToken>(
        options.tokens,
        token.path.join('.'),
      );

      return foundToken?.$type === Type.Radius;
    }

    return tokenType === Type.Radius;
  },
  transform: (token, _, options) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Value can be anything
    const value = options.usesDtcg ? token.$value : token.value;
    const schema = options.tokens;

    if (typeof value !== 'object') {
      // already transformed to string
      return String(value);
    }

    const typedValue = value as CompositeValue['radius'];
    const tokenPath = [...token.path];

    const defaultToken = get<IressDesignToken<CompositeValue['radius']>>(
      schema,
      tokenPath.join('.'),
    );
    const {
      topLeft = defaultToken
        ? convertReferencesToVariables(defaultToken.$value.topLeft)
        : undefined,
      topRight = defaultToken
        ? convertReferencesToVariables(defaultToken.$value.topRight)
        : undefined,
      bottomRight = defaultToken
        ? convertReferencesToVariables(defaultToken.$value.bottomRight)
        : undefined,
      bottomLeft = defaultToken
        ? convertReferencesToVariables(defaultToken.$value.bottomLeft)
        : undefined,
    } = shake(typedValue, (value) => !value) as CompositeValue['radius'];

    return [topLeft, topRight, bottomRight, bottomLeft]
      .filter((value) => !!value)
      .join(' ')
      .trim();
  },
};
