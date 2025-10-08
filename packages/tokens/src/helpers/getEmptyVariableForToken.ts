import { Type } from '../enums';
import { type IressDesignToken } from '../interfaces';

export const getEmptyVariableForToken = (token: IressDesignToken) => {
  switch (token.$type) {
    case Type.Color:
      return '';
    case Type.Dimension:
      return '0';
    case Type.FontFamily:
      return '';
    case Type.FontSize:
      return 0;
    case Type.Border:
      return {};
    case Type.Radius:
      return {};
    case Type.Shadow:
      return Array.isArray(token.$value) ? [] : {};
    case Type.Typography:
      return {};
    case Type.Background:
      return {};
    default:
      return '';
  }
};
