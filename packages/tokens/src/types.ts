import { type designTokens } from './schema';
import { type IressDesignToken } from './interfaces';

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends object
        ? Partial<{ [K in keyof T]: Widen<T[K]> }>
        : T;

type DeepPartialWithMutableValue<T> = {
  readonly [K in keyof T as K extends '$value'
    ? never
    : K]?: T[K] extends object ? DeepPartialWithMutableValue<T[K]> : T[K];
} & {
  [K in keyof T as K extends '$value' ? K : never]?: Widen<T[K]>;
};

export type IressTokenSchema = DeepPartialWithMutableValue<typeof designTokens>;

export type IressDesignTokenReadonly<T = string> = Required<
  Pick<IressDesignToken<T>, '$value'>
> &
  IressDesignToken<T>;
