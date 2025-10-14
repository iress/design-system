import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type MouseEvent,
} from 'react';
import { IressToaster } from './Toaster';
import {
  type IressToasterOptions,
  type IressToasterProps,
  type IressToasterProviderProps,
} from './Toaster.types';
import { type IressToastProps } from './Toast/Toast.types';
import { type ButtonRef } from '../Button';

interface ToasterContextValue {
  animateOut: (id: string) => void;
  show: (toast: IressToastProps) => string;
  close: (id: string, e?: MouseEvent<ButtonRef>) => void;
  options: IressToasterOptions;
  setOptions: (options: IressToasterOptions) => void;
}

export const ToasterContext = createContext<ToasterContextValue | undefined>(
  undefined,
);

export const IressToasterProvider = ({
  children,
  ...defaultOptions
}: IressToasterProviderProps) => {
  const [toasts, setToasts] = useState<IressToasterProps['toasts']>([]);
  const [options, setOptions] = useState<IressToasterOptions>({
    position: 'bottom-end',
    ...defaultOptions,
  });

  const removeToast = (id: string, e?: MouseEvent<ButtonRef>) =>
    setToasts((prevToasts) => {
      const toast = prevToasts?.find((toast) => toast.id === id);
      toast?.onClose?.(e);

      return prevToasts?.filter((toast) => toast.id !== id);
    });

  const show: ToasterContextValue['show'] = useCallback(
    (toast) => {
      const toastId = `${new Date().getTime()}`;
      const isTop = options.position?.includes('top');

      // Add Toast
      setToasts((prevToasts = []) => [
        ...(isTop ? [] : prevToasts),
        { ...toast, id: toastId },
        ...(isTop ? prevToasts : []),
      ]);

      return toastId;
    },
    [options.position],
  );

  const close: ToasterContextValue['close'] = useCallback(
    (closedId, e) => removeToast(closedId, e),
    [],
  );

  const animateOut: ToasterContextValue['animateOut'] = useCallback(
    (closedId: string) => {
      setToasts((prevToasts) =>
        prevToasts?.map((toast) =>
          toast.id === closedId ? { ...toast, timeout: 100 } : toast,
        ),
      );
    },
    [],
  );

  // The position in options is configurable param in the hook.
  const updatedValue = useMemo(
    () => ({
      animateOut,
      show,
      close,
      options,
      setOptions,
    }),
    [animateOut, close, options, show],
  );

  return (
    <ToasterContext.Provider value={updatedValue}>
      {children}
      <IressToaster toasts={toasts} {...options} />
    </ToasterContext.Provider>
  );
};
