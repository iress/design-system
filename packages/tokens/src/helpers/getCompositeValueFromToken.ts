import {
  type CSSVariablesMap,
  type CompositeValue,
  type IressDesignToken,
} from '../interfaces';
import { Type } from '../enums';
import { getTransformedFallback } from './getTransformedFallback';
import { getCssVariable } from './getCssVariable';

export const COMPOSITE_TOKENS = [
  Type.Background,
  Type.Border,
  Type.Radius,
  Type.Shadow,
  Type.Typography,
];

export const getCompositeValueFromToken = <T extends object>(
  schema: T,
  token: IressDesignToken,
  path: string[],
  readonly = false,
  prefix?: string,
) => {
  const _path = [...path.slice(0, -1), `_${path[path.length - 1]}`];

  if (token.$type === Type.Shadow) {
    return handleShadowToken(schema, token, _path, readonly, prefix);
  }

  if (token.$type === Type.Border) {
    return handleBorderToken(schema, token, _path, readonly, prefix);
  }

  if (token.$type === Type.Radius) {
    return handleRadiusToken(schema, token, _path, readonly, prefix);
  }

  if (token.$type === Type.Typography) {
    return handleTypographyToken(schema, token, _path, readonly, prefix);
  }

  return {};
};

const handleShadowToken = <T extends object>(
  schema: T,
  token: IressDesignToken,
  path: string[],
  readonly: boolean,
  prefix?: string,
) => {
  const shadowToken = token as unknown as IressDesignToken<
    CompositeValue['shadow'] | CompositeValue['shadow'][]
  >;

  if (Array.isArray(shadowToken.$value)) {
    const compoundMap: CSSVariablesMap = {};

    for (let i = 0; i < shadowToken.$value.length; i++) {
      const shadowValue = getShadowValue(
        schema,
        shadowToken.$value[i] ?? {},
        path,
        i,
      );
      compoundMap[i] = createShadowVariables(
        shadowValue,
        [...path, String(i)],
        readonly,
        prefix,
      );
    }
    return compoundMap;
  }

  const shadowValue = getShadowValue(schema, shadowToken.$value, path);
  return createShadowVariables(shadowValue, path, readonly);
};

const handleBorderToken = <T extends object>(
  schema: T,
  token: IressDesignToken,
  path: string[],
  readonly: boolean,
  prefix?: string,
) => {
  const borderToken = token as unknown as IressDesignToken<
    CompositeValue['border']
  >;
  const borderValue = getBorderValue(schema, borderToken.$value, path);

  return {
    color: readonly
      ? borderValue.color
      : getCssVariable([...path, 'color'], borderValue.color, prefix),
    width: readonly
      ? borderValue.width
      : getCssVariable([...path, 'width'], borderValue.width, prefix),
    style: readonly
      ? borderValue.style
      : getCssVariable([...path, 'style'], borderValue.style, prefix),
  };
};

const handleRadiusToken = <T extends object>(
  schema: T,
  token: IressDesignToken,
  path: string[],
  readonly: boolean,
  prefix?: string,
) => {
  const radiusToken = token as IressDesignToken<CompositeValue['radius']>;
  const radiusValue = getRadiusValue(schema, radiusToken.$value, path);

  return {
    topLeft: readonly
      ? radiusValue.topLeft
      : getCssVariable([...path, 'topLeft'], radiusValue.topLeft, prefix),
    topRight: readonly
      ? radiusValue.topRight
      : getCssVariable([...path, 'topRight'], radiusValue.topRight, prefix),
    bottomRight: readonly
      ? radiusValue.bottomRight
      : getCssVariable(
          [...path, 'bottomRight'],
          radiusValue.bottomRight,
          prefix,
        ),
    bottomLeft: readonly
      ? radiusValue.bottomLeft
      : getCssVariable([...path, 'bottomLeft'], radiusValue.bottomLeft, prefix),
  };
};

const handleTypographyToken = <T extends object>(
  schema: T,
  token: IressDesignToken,
  path: string[],
  readonly: boolean,
  prefix?: string,
) => {
  const typographyToken = token as IressDesignToken<
    CompositeValue['typography']
  >;
  const typographyValue = getTypographyValue(
    schema,
    typographyToken.$value,
    path,
  );

  return {
    fontFamily: readonly
      ? typographyValue.fontFamily
      : getCssVariable(
          [...path, 'fontFamily'],
          typographyValue.fontFamily,
          prefix,
        ),
    fontSize: readonly
      ? typographyValue.fontSize
      : getCssVariable([...path, 'fontSize'], typographyValue.fontSize, prefix),
    fontStyle: readonly
      ? typographyValue.fontStyle
      : getCssVariable(
          [...path, 'fontStyle'],
          typographyValue.fontStyle,
          prefix,
        ),
    fontVariant: readonly
      ? typographyValue.fontVariant
      : getCssVariable(
          [...path, 'fontVariant'],
          typographyValue.fontVariant,
          prefix,
        ),
    fontWeight: readonly
      ? typographyValue.fontWeight
      : getCssVariable(
          [...path, 'fontWeight'],
          typographyValue.fontWeight,
          prefix,
        ),
    fontWidth: readonly
      ? typographyValue.fontWidth
      : getCssVariable(
          [...path, 'fontWidth'],
          typographyValue.fontWidth,
          prefix,
        ),
    lineHeight: readonly
      ? typographyValue.lineHeight
      : getCssVariable(
          [...path, 'lineHeight'],
          typographyValue.lineHeight,
          prefix,
        ),
  };
};

const createShadowVariables = (
  shadowValue: ReturnType<typeof getShadowValue>,
  path: string[],
  readonly: boolean,
  prefix?: string,
) => ({
  color: readonly
    ? shadowValue.color
    : getCssVariable([...path, 'color'], shadowValue.color, prefix),
  offsetX: readonly
    ? shadowValue.offsetX
    : getCssVariable([...path, 'offsetX'], shadowValue.offsetX, prefix),
  offsetY: readonly
    ? shadowValue.offsetY
    : getCssVariable([...path, 'offsetY'], shadowValue.offsetY, prefix),
  blur: readonly
    ? shadowValue.blur
    : getCssVariable([...path, 'blur'], shadowValue.blur, prefix),
  spread: readonly
    ? shadowValue.spread
    : getCssVariable([...path, 'spread'], shadowValue.spread, prefix),
});

const getShadowValue = <T extends object>(
  schema: T,
  shadowValue: CompositeValue['shadow'],
  path: string[],
  index?: number,
) => {
  const pathWithIndex = index !== undefined ? [...path, String(index)] : path;
  return {
    color: getValue(schema, shadowValue.color, Type.Color, [
      ...pathWithIndex,
      'color',
    ]),
    offsetX: getValue(schema, shadowValue.offsetX, Type.Dimension, [
      ...pathWithIndex,
      'offsetX',
    ]),
    offsetY: getValue(schema, shadowValue.offsetY, Type.Dimension, [
      ...pathWithIndex,
      'offsetY',
    ]),
    blur: getValue(schema, shadowValue.blur, Type.Dimension, [
      ...pathWithIndex,
      'blur',
    ]),
    spread: getValue(schema, shadowValue.spread, Type.Dimension, [
      ...pathWithIndex,
      'spread',
    ]),
  };
};

const getBorderValue = <T extends object>(
  schema: T,
  value: CompositeValue['border'],
  path: string[],
) => ({
  color: getValue(schema, value.color, Type.Color, [...path, 'color']),
  width: getValue(schema, value.width, Type.Dimension, [...path, 'width']),
  style: getValue(schema, value.style, Type.Dimension, [...path, 'style']),
});

const getRadiusValue = <T extends object>(
  schema: T,
  value: CompositeValue['radius'],
  path: string[],
) => ({
  topLeft: getValue(schema, value.topLeft, Type.Dimension, [
    ...path,
    'topLeft',
  ]),
  topRight: getValue(schema, value.topRight, Type.Dimension, [
    ...path,
    'topRight',
  ]),
  bottomRight: getValue(schema, value.bottomRight, Type.Dimension, [
    ...path,
    'bottomRight',
  ]),
  bottomLeft: getValue(schema, value.bottomLeft, Type.Dimension, [
    ...path,
    'bottomLeft',
  ]),
});

const getTypographyValue = <T extends object>(
  schema: T,
  value: CompositeValue['typography'],
  path: string[],
) => ({
  fontFamily: getValue(schema, value.fontFamily, Type.FontFamily, [
    ...path,
    'fontFamily',
  ]),
  fontSize: getValue(schema, value.fontSize, Type.FontSize, [
    ...path,
    'fontSize',
  ]),
  fontStyle: getValue(schema, value.fontStyle, Type.Dimension, [
    ...path,
    'fontStyle',
  ]),
  fontVariant: getValue(schema, value.fontVariant, Type.Dimension, [
    ...path,
    'fontVariant',
  ]),
  fontWeight: getValue(schema, value.fontWeight, Type.Dimension, [
    ...path,
    'fontWeight',
  ]),
  fontWidth: getValue(schema, value.fontWidth, Type.Dimension, [
    ...path,
    'fontWidth',
  ]),
  lineHeight: getValue(schema, value.lineHeight, Type.Dimension, [
    ...path,
    'lineHeight',
  ]),
});

const getValue = <T extends object>(
  schema: T,
  value: string | number | undefined,
  type: Type,
  path: string[],
) =>
  getTransformedFallback(
    schema,
    {
      $description: '',
      $type: type,
      $value: value,
    },
    path,
  ) ?? '';
