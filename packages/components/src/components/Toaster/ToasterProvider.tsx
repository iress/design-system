import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from 'react';
import { Toaster, type ToasterItem, type ToasterProps } from './Toaster';
import {
  registerToaster,
  type ToasterRegister,
  unregisterToaster,
} from './helpers/toasterRegister';
import { ToasterContext } from './hooks/useToaster';

export interface IressToasterProviderProps
  extends Omit<ToasterProps, 'toasts'>,
    PropsWithChildren {
  /**
   * A unique identifier for the toaster provider.
   * This is useful if you have multiple toaster providers in your application based on context.
   */
  id?: string;
}

export const IressToasterProvider = ({
  children,
  id,
  position,
  ...restProps
}: IressToasterProviderProps) => {
  const [toasts, setToasts] = useState<ToasterItem[]>([]);

  const remove = useCallback(
    (id: string, e?: MouseEvent<HTMLButtonElement>) => {
      setToasts((prevToasts) => {
        const toast = prevToasts?.find((toast) => toast.id === id);
        toast?.onClose?.(e);

        return prevToasts?.filter((toast) => toast.id !== id);
      });
    },
    [],
  );

  const show: ToasterRegister['show'] = useCallback(
    (status, toast) => {
      const toastId = toast.id ?? `${new Date().getTime()}`;
      const isTop = position?.includes('top');

      // Add Toast
      setToasts((prevToasts = []) => [
        ...(isTop ? [] : prevToasts),
        { ...toast, id: toastId, status },
        ...(isTop ? prevToasts : []),
      ]);

      return toastId;
    },
    [position],
  );

  const close: ToasterRegister['close'] = useCallback((closedId: string) => {
    setToasts((prevToasts) =>
      prevToasts?.map((toast) =>
        toast.id === closedId ? { ...toast, timeout: 100 } : toast,
      ),
    );
  }, []);

  // The position in options is configurable param in the hook.
  const updatedValue = useMemo(
    () => ({
      close,
      remove,
      show,
    }),
    [close, remove, show],
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    registerToaster(id, updatedValue);
    return () => unregisterToaster(id);
  }, [id, updatedValue]);

  return (
    <ToasterContext.Provider value={updatedValue}>
      {children}
      <Toaster id={id} position={position} {...restProps} toasts={toasts} />
    </ToasterContext.Provider>
  );
};
