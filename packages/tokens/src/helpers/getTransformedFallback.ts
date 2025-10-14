import { isPrimitive } from 'radash';
import { convertReferencesToVariables } from './convertReferencesToVariables';
import { type Config, type TransformedToken } from 'style-dictionary';
import { type DesignTokens, type Transform } from 'style-dictionary/types';
import { Type } from '../enums';
import { type IressDesignToken } from '../interfaces';
import { backgroundCssShorthand } from '../transforms/backgroundCssShorthand';
import { borderCssShorthand } from '../transforms/borderCssShorthand';
import { radiusCssShorthand } from '../transforms/radiusCssShorthand';
import { shadowCssShorthand } from '../transforms/shadowCssShorthand';
import { typographyCssShorthand } from '../transforms/typographyCssShorthand';

// We set the options for the transforms
const options: Config = {
  usesDtcg: true,
};

type SupportedFallbacks =
  | Type.Background
  | Type.Border
  | Type.Radius
  | Type.Shadow
  | Type.Typography;

const fallbackMapper: Record<
  SupportedFallbacks,
  Omit<Transform, 'name'> | undefined
> = {
  [Type.Background]: backgroundCssShorthand,
  [Type.Border]: borderCssShorthand,
  [Type.Radius]: radiusCssShorthand,
  [Type.Shadow]: shadowCssShorthand,
  [Type.Typography]: typographyCssShorthand,
};

export const getTransformedFallback = <T, TSchema extends object>(
  schema: TSchema,
  token: IressDesignToken<T>,
  path: string[],
  prefix?: string,
) => {
  const fallback = token.$value;

  if (fallback == undefined) {
    return undefined;
  }

  if (isPrimitive(fallback)) {
    const fallbackValue = convertReferencesToVariables(
      String(fallback),
      prefix,
    );
    return isNaN(Number(fallbackValue)) ? fallbackValue : Number(fallbackValue);
  }

  // We create a transformed token to pass to the fallback transform
  // TODO: Once Style Dictionary allows us to transform a single token, we can clean this up
  const transformedToken: TransformedToken = {
    ...token,
    name: path.join('.'),
    path,
    original: token,
    filePath: '',
    isSource: false,
  };

  const fallbackTransform = fallbackMapper[token.$type as SupportedFallbacks];

  if (fallbackTransform) {
    const fallbackValue = convertReferencesToVariables(
      fallbackTransform.transform(
        transformedToken,
        {},
        { ...options, tokens: schema as DesignTokens },
      ) as string,
      prefix,
    );
    return isNaN(Number(fallbackValue)) ? fallbackValue : Number(fallbackValue);
  }

  return undefined;
};
