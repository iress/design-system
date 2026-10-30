import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, Resolver } from 'react-hook-form';
import type { ZodType } from 'zod/v4';
import type { FormSchema } from '../HookForm/HookForm';

/**
 * Keep resolver identity stable and reject ambiguous JavaScript configurations,
 * in addition to the mutually exclusive TypeScript props.
 */
export const useSchemaResolver = <T extends FieldValues, TContext, TOutput>(
  schema?: FormSchema<TOutput, T>,
  resolver?: Resolver<T, TContext, TOutput>,
): Resolver<T, TContext, TOutput> | undefined =>
  useMemo(() => {
    if (schema && resolver) {
      throw new Error('IressForm accepts either schema or resolver, not both.');
    }
    if (
      schema &&
      (schema._zod?.version?.major !== 4 ||
        typeof schema.parseAsync !== 'function')
    ) {
      throw new Error('IressForm schema must be a Zod 4 schema.');
    }
    return schema
      ? zodResolver<T, TContext, TOutput>(schema as ZodType<TOutput, T>)
      : resolver;
  }, [schema, resolver]);
