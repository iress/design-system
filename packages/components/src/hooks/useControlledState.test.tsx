import { act, renderHook, waitFor } from '@testing-library/react';
import { ControlledStateProps, useControlledState } from './useControlledState';
import { FormControlValue } from '../types';
import { idsLogger } from '@helpers/utility/idsLogger';

describe('useControlledState', () => {
  it('returns state by default', () => {
    const hook = renderHook(() => useControlledState({ component: 'test' }));
    const { value, setValue, toggleValue, isControlled } = hook.result.current;
    expect(value).toBeUndefined();
    expect(setValue).toBeInstanceOf(Function);
    expect(toggleValue).toBeInstanceOf(Function);
    expect(isControlled).toBe(false);
  });

  describe('props', () => {
    describe('defaultValue', () => {
      it('returns value if set', () => {
        const hook = renderHook(() =>
          useControlledState({ component: 'test', defaultValue: 'test' }),
        );
        const { value } = hook.result.current;
        expect(value).toBe('test');
      });

      it('does not syncs prop, if changed using props', () => {
        const hook = renderHook(
          (
            props: ControlledStateProps = {
              component: 'test',
              defaultValue: undefined,
            },
          ) => useControlledState(props),
        );
        hook.rerender({ component: 'test', defaultValue: 'test' });
        expect(hook.result.current.value).toBe(undefined);
      });
    });

    describe('multiple', () => {
      it('returns empty array by default', () => {
        const hook = renderHook(() =>
          useControlledState({ component: 'test', multiple: true }),
        );
        const { value } = hook.result.current;
        expect(value).toStrictEqual([]);
      });

      it('returns value as array if multiselect', () => {
        const hook = renderHook(() =>
          useControlledState({
            component: 'test',
            multiple: true,
            defaultValue: 'test',
          }),
        );
        const { value } = hook.result.current;
        expect(value).toStrictEqual(['test']);
      });

      it('syncs value prop to an array in multiSelect', () => {
        const hook = renderHook(
          (
            props: ControlledStateProps<FormControlValue[]> = {
              component: 'test',
              multiple: true,
              value: [],
            },
          ) => useControlledState(props),
        );
        hook.rerender({ component: 'test', multiple: true, value: ['test2'] });
        expect(hook.result.current.value).toStrictEqual(['test2']);
      });
    });

    describe('onChange', () => {
      it('is called when value is changed using setValue', () => {
        const onChange = vi.fn();
        const hook = renderHook(() =>
          useControlledState({ component: 'test', onChange }),
        );
        const { setValue } = hook.result.current;

        act(() => setValue('test'));
        expect(onChange).toBeCalledWith('test');
        act(() => setValue(undefined));
        expect(onChange).toBeCalledWith(undefined);
      });

      it('is called when value is changed using toggleValue', () => {
        const onChange = vi.fn();
        const hook = renderHook(() =>
          useControlledState({ component: 'test', onChange }),
        );
        const { toggleValue } = hook.result.current;

        act(() => toggleValue('test', true));
        expect(onChange).toBeCalledWith('test');
        act(() => toggleValue('test', false));
        expect(onChange).toBeCalledWith(undefined);
      });

      it('is called when value is changed using toggleValue (multiple)', () => {
        const onChange = vi.fn();
        const hook = renderHook(() =>
          useControlledState({ component: 'test', multiple: true, onChange }),
        );
        const { toggleValue } = hook.result.current;

        act(() => toggleValue('test', true));
        expect(onChange).toBeCalledWith(['test']);
        act(() => toggleValue('test', false));
        expect(onChange).toBeCalledWith([]);
      });

      it('is not called when value is changed using props', () => {
        const onChange = vi.fn();
        const hook = renderHook(
          (
            props: ControlledStateProps<FormControlValue[]> = {
              component: 'test',
              onChange,
            },
          ) => useControlledState(props),
        );
        hook.rerender({ component: 'test', value: ['test2'] });
        expect(onChange).not.toBeCalled();
      });
    });

    describe('value', () => {
      it('returns value if set', () => {
        const hook = renderHook(() =>
          useControlledState({ component: 'test', value: 'test' }),
        );
        const { value } = hook.result.current;
        expect(value).toBe('test');
      });

      it('syncs prop, if changed using props', () => {
        const hook = renderHook(
          (
            props: ControlledStateProps = {
              component: 'test',
              value: undefined,
            },
          ) => useControlledState(props),
        );
        hook.rerender({ component: 'test', value: 'test' });
        expect(hook.result.current.value).toBe('test');
      });

      it('cycles value properly when going from undefined to defined and back again', () => {
        const hook = renderHook(
          (
            props: ControlledStateProps = {
              component: 'test',
              value: undefined,
            },
          ) => useControlledState(props),
        );

        hook.rerender({ component: 'test', value: 'test' });
        expect(hook.result.current.value).toBe('test');

        hook.rerender({ component: 'test', value: undefined });
        expect(hook.result.current.value).toBe(undefined);

        hook.rerender({ component: 'test', value: 'test2' });
        expect(hook.result.current.value).toBe('test2');
      });

      it('cycles value properly when going from undefined to 0/null to undefined', () => {
        const hook = renderHook(
          (
            props: ControlledStateProps = {
              component: 'test',
              value: undefined,
            },
          ) => useControlledState(props),
        );

        hook.rerender({ component: 'test', value: 0 });
        expect(hook.result.current.value).toBe(0);

        hook.rerender({ component: 'test', value: undefined });
        expect(hook.result.current.value).toBe(undefined);
      });
    });
  });

  describe('warnings', () => {
    it('logs a warning when both the value and defaultValue props are used', async () => {
      renderHook(() =>
        useControlledState({
          component: 'test',
          defaultValue: 'test1',
          value: 'test2',
        }),
      );

      await waitFor(() =>
        expect(idsLogger).toBeCalledWith(
          `test: Please use either the defaultValue prop for uncontrolled components, or the value prop for controlled components, rather than both. If you use both, the value of the component may become unpredictable.`,
          'warn',
        ),
      );
    });

    it('logs a warning when both the selected and defaultSelected props are used (custom propName)', async () => {
      renderHook(() =>
        useControlledState({
          component: 'test',
          defaultValue: 'test1',
          value: 'test2',
          propName: 'selected',
        }),
      );

      await waitFor(() =>
        expect(idsLogger).toBeCalledWith(
          `test: Please use either the defaultSelected prop for uncontrolled components, or the selected prop for controlled components, rather than both. If you use both, the value of the component may become unpredictable.`,
          'warn',
        ),
      );
    });
  });
});
