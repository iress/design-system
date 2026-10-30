import { createRef } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import { z } from 'zod/v4';
import { z as z3 } from 'zod/v3';
import { z as mini } from 'zod/v4/mini';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import {
  IressForm,
  IressFormField,
  IressFormFieldset,
  IressHookForm,
  type FormRef,
  type IressFormProps,
} from '@/main';
import { getSchemaRequired } from './helpers/getSchemaRequired';

const schema = z.object({
  name: z.string().min(1, 'Enter your name'),
  age: z.string().min(1, 'Enter your age').transform(Number),
});

describe('IressForm schema validation', () => {
  it('infers transformed values through a Zod-independent schema contract', () => {
    const publicSchema: {
      _input: { name: string; age: string };
      _output: { name: string; age: number };
      _zod: {
        version: { major: 4 };
      };
      parseAsync: (data: unknown) => Promise<{ name: string; age: number }>;
    } = schema;
    const form = (
      <IressForm
        schema={publicSchema}
        defaultValues={{ age: '36' }}
        onSubmit={(data) => {
          expectTypeOf(data).toEqualTypeOf<{ name: string; age: number }>();
        }}
      />
    );
    expect(form).toBeDefined();
    const invalidDefaults = (
      // @ts-expect-error schema defaults use input, not transformed output
      <IressForm schema={publicSchema} defaultValues={{ age: 36 }} />
    );
    expect(invalidDefaults).toBeDefined();
    // @ts-expect-error Zod 3 is not a Zod 4 classic schema
    const legacy = <IressForm schema={z3.object({ name: z3.string() })} />;
    expect(legacy).toBeDefined();
    // @ts-expect-error Zod Mini does not expose classic input/output markers
    const minimal = <IressForm schema={mini.object({ name: mini.string() })} />;
    expect(minimal).toBeDefined();
  });

  it.each(['short', 'long'] as const)(
    'validates and submits transformed values for the %s pattern',
    async (pattern) => {
      const onSubmit = vi.fn();
      const ref =
        createRef<
          FormRef<z.input<typeof schema>, object, z.output<typeof schema>>
        >();
      render(
        <IressForm
          pattern={pattern}
          heading="Profile"
          schema={schema}
          defaultValues={{ name: '', age: '' }}
          onSubmit={onSubmit}
          ref={ref}
          actions={<button type="submit">Save</button>}
        >
          <IressFormField
            name="name"
            label="Name"
            render={(field) => <input {...field} />}
          />
          <IressFormField
            name="age"
            label="Age"
            render={(field) => <input {...field} />}
          />
        </IressForm>,
      );
      await userEvent.click(screen.getByRole('button', { name: 'Save' }));
      expect(onSubmit).not.toHaveBeenCalled();
      expect(await screen.findAllByText('Enter your name')).not.toHaveLength(0);
      await userEvent.type(
        screen.getByRole('textbox', { name: /Name/ }),
        'Ada',
      );
      await userEvent.type(screen.getByRole('textbox', { name: /Age/ }), '36');
      await userEvent.click(screen.getByRole('button', { name: 'Save' }));
      await waitFor(() =>
        expect(onSubmit).toHaveBeenCalledWith({ name: 'Ada', age: 36 }),
      );
      expect(ref.current?.api.getValues('age')).toBe('36');
    },
  );

  it('derives indicators from nested schema inputs and respects both overrides', () => {
    const indicatorSchema = z.object({
      required: z.string(),
      optional: z.string().optional(),
      nullable: z.string().nullable(),
      defaulted: z.string().default('Default'),
      prefaulted: z.string().prefault('Default'),
      caught: z.string().catch('Fallback'),
      readOnly: z.string(),
      profile: z.object({ email: z.string() }),
      contacts: z.array(z.object({ email: z.string() })),
      optionalProfile: z.object({ email: z.string() }).optional(),
    });
    const names = [
      'required',
      'optional',
      'nullable',
      'defaulted',
      'prefaulted',
      'caught',
      'profile.email',
      'contacts.0.email',
      'optionalProfile.email',
    ];
    render(
      <IressForm schema={indicatorSchema}>
        {names.map((name) => (
          <IressFormField
            key={name}
            name={name}
            label={name}
            data-testid={name}
            render={(field) => <input {...field} />}
          />
        ))}
        <IressFormField
          name="required"
          label="Hidden required"
          required={false}
          data-testid="hidden-required"
          render={(field) => <input {...field} />}
        />
        <IressFormFieldset
          name="optional"
          label="Explicit required"
          required
          data-testid="explicit-required"
          render={(field) => <input {...field} />}
        />
        <IressFormField
          name="optional"
          label="Explicit field"
          required
          data-testid="explicit-field"
          render={(field) => <input {...field} />}
        />
        <IressFormField
          name="readOnly"
          label="Read-only field"
          readOnly
          required
          data-testid="read-only"
          render={(field) => <input {...field} />}
        />
        <IressFormFieldset
          name="required"
          label="Automatic group"
          data-testid="automatic-group"
          render={(field) => <input {...field} />}
        />
        <IressFormFieldset
          name="required"
          label="Hidden group"
          required={false}
          data-testid="hidden-group"
          render={(field) => <input {...field} />}
        />
      </IressForm>,
    );
    for (const name of [
      'required',
      'profile.email',
      'contacts.0.email',
      'explicit-required',
      'automatic-group',
      'explicit-field',
    ]) {
      expect(
        within(screen.getByTestId(name)).getByText('*'),
      ).toBeInTheDocument();
    }
    for (const name of [
      'optional',
      'nullable',
      'defaulted',
      'prefaulted',
      'caught',
      'optionalProfile.email',
      'hidden-required',
      'hidden-group',
      'read-only',
    ]) {
      expect(within(screen.getByTestId(name)).queryByText('*')).toBeNull();
    }
  });

  it('preserves external useForm resolvers and supports explicit indicators', async () => {
    const onSubmit = vi.fn();
    const Example = () => {
      const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { name: 'Ada', age: '36' },
      });
      return (
        <IressHookForm
          form={form}
          onSubmit={(data) => {
            expectTypeOf(data).toEqualTypeOf<z.output<typeof schema>>();
            onSubmit(data);
          }}
        >
          <IressFormField
            control={form.control}
            name="name"
            label="Name"
            required
            render={(field) => <input {...field} />}
          />
          <IressFormFieldset
            control={form.control}
            name="age"
            label="Age"
            required={false}
            render={(field) => <input {...field} />}
          />
          <button type="submit">Save</button>
        </IressHookForm>
      );
    };
    render(<Example />);
    expect(screen.getByText('*')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ name: 'Ada', age: 36 }),
    );
  });

  it('retains rule-based indicators without a schema', () => {
    render(
      <IressForm>
        <IressFormField
          name="name"
          label="Name"
          rules={{ required: 'Required' }}
          render={(field) => <input {...field} />}
        />
      </IressForm>,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not execute consumer code when inspecting schema metadata', () => {
    const refine = vi.fn(async () => true);
    const superRefine = vi.fn(async () => undefined);
    const transform = vi.fn((value: string) => value.length);
    const defaultValue = vi.fn(() => 'Default');
    const lazy = vi.fn(() => z.string());
    const metadataSchema = z
      .object({
        refined: z.string().refine(refine),
        transformed: z.string().transform(transform),
        defaulted: z.string().default(defaultValue),
        conditional: z.union([z.string(), z.undefined()]),
        lazy: z.lazy(lazy),
        profile: z.object({ email: z.string() }).nullable(),
        contacts: z.array(z.object({ email: z.string().optional() })),
        unknown: z.unknown(),
        restored: z.string().optional().nonoptional(),
      })
      .superRefine(superRefine);
    expect(getSchemaRequired(metadataSchema, 'refined')).toBe(true);
    expect(getSchemaRequired(metadataSchema, 'transformed')).toBe(true);
    expect(getSchemaRequired(metadataSchema, 'defaulted')).toBe(false);
    expect(getSchemaRequired(metadataSchema, 'conditional')).toBeUndefined();
    expect(getSchemaRequired(metadataSchema, 'lazy')).toBeUndefined();
    expect(getSchemaRequired(metadataSchema, 'missing')).toBeUndefined();
    expect(getSchemaRequired(metadataSchema, 'profile.email')).toBe(false);
    expect(getSchemaRequired(metadataSchema, 'contacts[0].email')).toBe(false);
    expect(getSchemaRequired(metadataSchema, 'unknown')).toBe(false);
    expect(getSchemaRequired(metadataSchema, 'restored')).toBeUndefined();
    for (const callback of [
      refine,
      superRefine,
      transform,
      defaultValue,
      lazy,
    ]) {
      expect(callback).not.toHaveBeenCalled();
    }
  });

  it.each(['short', 'long'] as const)(
    'preserves a custom resolver on the %s pattern',
    async (pattern) => {
      const onSubmit = vi.fn();
      const resolver = zodResolver(schema);
      render(
        <IressForm
          pattern={pattern}
          heading="Profile"
          resolver={resolver}
          defaultValues={{ name: 'Ada', age: '36' }}
          onSubmit={(data) => {
            expectTypeOf(data).toEqualTypeOf<z.output<typeof schema>>();
            onSubmit(data);
          }}
          actions={<button type="submit">Save</button>}
        >
          <IressFormField
            name="name"
            label="Name"
            required
            render={(field) => <input {...field} />}
          />
        </IressForm>,
      );
      await userEvent.click(screen.getByRole('button', { name: 'Save' }));
      await waitFor(() =>
        expect(onSubmit).toHaveBeenCalledWith({ name: 'Ada', age: 36 }),
      );
    },
  );

  it('submits schema defaults and maps nested array validation errors', async () => {
    const onSubmit = vi.fn();
    const nestedSchema = z.object({
      contacts: z.array(
        z.object({ email: z.string().min(1, 'Enter a contact email') }),
      ),
      category: z.string().default('customer'),
    });
    render(
      <IressForm
        schema={nestedSchema}
        defaultValues={{ contacts: [{ email: '' }] }}
        onSubmit={(data) => {
          expectTypeOf(data.category).toEqualTypeOf<string>();
          onSubmit(data);
        }}
        actions={<button type="submit">Save</button>}
      >
        <IressFormField
          name="contacts.0.email"
          label="Contact email"
          render={(field) => <input {...field} />}
        />
      </IressForm>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(
      await screen.findAllByText('Enter a contact email'),
    ).not.toHaveLength(0);
    expect(onSubmit).not.toHaveBeenCalled();
    await userEvent.type(screen.getByRole('textbox'), 'ada@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        contacts: [{ email: 'ada@example.com' }],
        category: 'customer',
      }),
    );
  });

  it.each(['short', 'long'] as const)(
    'rejects ambiguous runtime configuration for the %s pattern',
    (pattern) => {
      const invalid = {
        pattern,
        heading: 'Profile',
        actions: <button>Save</button>,
        schema,
        resolver: zodResolver(schema),
      } as unknown as IressFormProps<z.input<typeof schema>>;
      expect(() => render(<IressForm {...invalid} />)).toThrow(
        'IressForm accepts either schema or resolver, not both.',
      );
    },
  );

  it('rejects unsupported schemas at runtime', () => {
    const invalid = {
      schema: { parseAsync: vi.fn() },
    } as unknown as IressFormProps<z.input<typeof schema>>;
    expect(() => render(<IressForm {...invalid} />)).toThrow(
      'IressForm schema must be a Zod 4 schema.',
    );
  });

  it('runs asynchronous schema validation on submit', async () => {
    const onSubmit = vi.fn();
    const asyncSchema = z.object({
      name: z
        .string()
        .refine(async (value) => value !== 'taken', 'Name is taken'),
    });
    render(
      <IressForm
        schema={asyncSchema}
        defaultValues={{ name: 'taken' }}
        onSubmit={onSubmit}
        actions={<button type="submit">Save</button>}
      >
        <IressFormField
          name="name"
          label="Name"
          render={(field) => <input {...field} />}
        />
      </IressForm>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findAllByText('Name is taken')).not.toHaveLength(0);
    expect(onSubmit).not.toHaveBeenCalled();
    await userEvent.clear(screen.getByRole('textbox'));
    await userEvent.type(screen.getByRole('textbox'), 'available');
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ name: 'available' }),
    );
  });

  it('infers schema input/output and rejects schema plus resolver at compile time', () => {
    const ref =
      createRef<
        FormRef<z.input<typeof schema>, object, z.output<typeof schema>>
      >();
    const form = (
      <IressForm
        schema={schema}
        onSubmit={(data) => {
          expectTypeOf(data).toEqualTypeOf<z.output<typeof schema>>();
          expectTypeOf(data.age).toEqualTypeOf<number>();
        }}
      />
    );
    expect(form).toBeDefined();
    const longForm = (
      <IressForm
        pattern="long"
        heading="Profile"
        actions={null}
        schema={schema}
        defaultValues={{ age: '36' }}
        ref={ref}
        onSubmit={(data) => {
          expectTypeOf(data).toEqualTypeOf<z.output<typeof schema>>();
        }}
      />
    );
    expect(longForm).toBeDefined();
    const resolver: Resolver<
      z.input<typeof schema>,
      object,
      z.output<typeof schema>
    > = zodResolver(schema);
    // @ts-expect-error schema and resolver cannot both be provided
    const invalid: IressFormProps<
      z.input<typeof schema>,
      object,
      z.output<typeof schema>
    > = { schema, resolver };
    expect(invalid).toBeDefined();
    const checkRef = (
      formRef: FormRef<z.input<typeof schema>, object, z.output<typeof schema>>,
    ) => {
      expectTypeOf(formRef.api.getValues('age')).toEqualTypeOf<string>();
      formRef.api.handleSubmit((data) => {
        expectTypeOf(data.age).toEqualTypeOf<number>();
      });
    };
    expect(checkRef).toBeDefined();
  });
});
