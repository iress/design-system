import type { $ZodType, $ZodTypes } from 'zod/v4/core';
import type { FormSchema } from '../HookForm/HookForm';

/**
 * Inspect Zod 4's schema definitions, never parse/isOptional (which can execute
 * defaults, transforms, refinements, or asynchronous consumer code).
 * Unknown paths and conditional schemas deliberately return no inference.
 */
export const getSchemaRequired = (
  schema: FormSchema | undefined,
  name: string,
): boolean | undefined => {
  const parts = name.replace(/\[(\d+)\]/g, '.$1').split('.');

  const visit = (
    current: $ZodType,
    index: number,
    optional: boolean,
  ): boolean | undefined => {
    const def = (current as $ZodTypes)._zod.def;
    switch (def.type) {
      case 'optional':
      case 'nullable':
      case 'default':
      case 'prefault':
      case 'catch':
        return visit(def.innerType, index, true);
      case 'readonly':
        return visit(def.innerType, index, optional);
      case 'pipe':
        return visit(def.in, index, optional);
      case 'union':
      case 'intersection':
      case 'lazy':
      case 'transform':
      case 'custom':
      case 'nonoptional':
        return undefined;
      case 'any':
      case 'unknown':
      case 'undefined':
      case 'void':
      case 'null':
        return index === parts.length ? false : undefined;
      default:
        if (index === parts.length) {
          return !optional;
        }
        if (def.type === 'object' && Object.hasOwn(def.shape, parts[index])) {
          return visit(def.shape[parts[index]], index + 1, optional);
        }
        if (def.type === 'array' && /^\d+$/.test(parts[index])) {
          return visit(def.element, index + 1, optional);
        }
        return undefined;
    }
  };

  return schema ? visit(schema as unknown as $ZodType, 0, false) : undefined;
};
