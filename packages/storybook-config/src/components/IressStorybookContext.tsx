import {
  IressDivider,
  type IressDividerProps,
  IressExpander,
  type IressExpanderProps,
  IressInline,
  type IressInlineProps,
  IressPanel,
  type IressPanelProps,
  IressProvider,
  type IressProviderProps,
  IressStack,
  type IressStackProps,
  IressTab,
  type IressTabProps,
  IressTabSet,
  type IressTabSetProps,
  IressText,
  type IressTextProps,
  useBreakpoint,
} from '@iress-oss/ids-components';
import { type ComponentType, createContext } from 'react';

export interface IressStorybookComponentMapping {
  IressDivider: ComponentType<IressDividerProps>;
  IressExpander: ComponentType<IressExpanderProps>;
  IressInline: ComponentType<IressInlineProps>;
  IressPanel: ComponentType<IressPanelProps>;
  IressProvider: ComponentType<IressProviderProps>;
  IressStack: ComponentType<IressStackProps>;
  IressTab: ComponentType<IressTabProps>;
  IressTabSet: ComponentType<IressTabSetProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  IressText: ComponentType<IressTextProps<any>>;
  useBreakpoint: typeof useBreakpoint;
}

export const COMPONENT_MAPPING_DEFAULT: IressStorybookComponentMapping = {
  IressDivider: IressDivider,
  IressExpander: IressExpander,
  IressInline: IressInline,
  IressPanel: IressPanel,
  IressProvider: IressProvider,
  IressStack: IressStack,
  IressTab: IressTab,
  IressTabSet: IressTabSet,
  IressText: IressText,
  useBreakpoint: useBreakpoint,
};

export const IressStorybookContext =
  createContext<IressStorybookComponentMapping>(COMPONENT_MAPPING_DEFAULT);
