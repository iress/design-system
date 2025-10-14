import { createContext, useCallback, useContext, useMemo } from 'react';
import {
  getToaster,
  type NewToast,
  type ToasterRegister,
} from '../helpers/toasterRegister';

interface ToasterHookReturn {
  /**
   * Show a toast when an error occurs.
   * @param toast The toast object containing the `content`, `heading`, and other optional properties. Can also be a string if you want to simply display a message.
   * @return A string representing the ID of the created toast.
   */
  error: (toast: NewToast | string) => string;

  /**
   * Show a toast on a successful operation.
   * @param toast The toast object containing the `content`, `heading`, and other optional properties. Can also be a string if you want to simply display a message.
   * @return A string representing the ID of the created toast.
   */
  success: (toast: NewToast | string) => string;

  /**
   * Show a toast to inform the user of an event or action.
   * @param toast The toast object containing the `content`, `heading`, and other optional properties. Can also be a string if you want to simply display a message.
   * @return A string representing the ID of the created toast.
   */
  info: (toast: NewToast | string) => string;

  /**
   * Close a toast by its ID.
   * @param toastId The ID of the toast to close.
   */
  close: ToasterRegister['close'];
}

export const ToasterContext = createContext<ToasterRegister | undefined>(
  undefined,
);

const transformToNewToast = (toast: NewToast | string) => {
  if (typeof toast !== 'string') return toast;
  return { content: toast };
};

/**
 * This hook provides allows you to show and close toasts in your application.
 * @param id Optional ID of the `IressToasterProvider` to use. If not provided, the closest `IressToasterProvider` will be used.
 */
export const useToaster = (id?: string): ToasterHookReturn => {
  const context = useContext(ToasterContext);

  if (context === undefined) {
    throw new Error('useToaster must be used within a IressToasterProvider');
  }

  const show = useCallback<ToasterRegister['show']>(
    (status, toast) => {
      const toaster = id ? getToaster(id) : context;

      if (!toaster && id) {
        throw new Error(`Toaster with id "${id}" not found.`);
      }

      return toaster?.show(status, toast) ?? '';
    },
    [context, id],
  );

  const close = useCallback<ToasterRegister['close']>(
    (toastId) => {
      const toaster = id ? getToaster(id) : context;

      if (!toaster && id) {
        throw new Error(`Toaster with id "${id}" not found.`);
      }

      toaster?.close(toastId);
    },
    [context, id],
  );

  return useMemo(
    () => ({
      success: (toast: NewToast | string) =>
        show('success', transformToNewToast(toast)),
      error: (toast: NewToast | string) =>
        show('error', transformToNewToast(toast)),
      info: (toast: NewToast | string) =>
        show('info', transformToNewToast(toast)),
      close,
    }),
    [close, show],
  );
};
