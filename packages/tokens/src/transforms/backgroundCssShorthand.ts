import { type Transform } from 'style-dictionary/types';
import { transformTypes } from 'style-dictionary/enums';
import { Type } from '../enums';
import { type IressDesignToken, type CompositeValue } from '../interfaces';
import { get } from 'radash';

export const backgroundCssShorthand: Transform = {
  name: 'background/css/shorthand',
  type: transformTypes.value,
  transitive: true,
  filter: (token, options) => {
    const tokenType = options.usesDtcg ? token.$type : token.type;

    if (!tokenType && options.tokens) {
      const foundToken = get<IressDesignToken>(
        options.tokens,
        token.path.join('.'),
      );

      return foundToken?.$type === Type.Background;
    }

    return tokenType === Type.Background;
  },
  transform: (token, _, options) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Value can be anything
    const value = options.usesDtcg ? token.$value : token.value;

    if (typeof value !== 'object') {
      // already transformed to string
      return String(value);
    }

    const typedValue = value as CompositeValue['background'];

    return [
      typedValue.color,
      typedValue.image ? `url(${typedValue.image})` : '',
      typedValue.position,
      typedValue.position && typedValue.size ? '/' : '',
      typedValue.size,
      typedValue.repeat,
      typedValue.attachment,
      typedValue.origin,
      typedValue.clip,
    ]
      .filter((value) => !!value)
      .join(' ')
      .trim();
  },
};
