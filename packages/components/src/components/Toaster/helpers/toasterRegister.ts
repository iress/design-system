import { MouseEvent } from 'react';
import { ToasterItem } from '../Toaster';

export interface NewToast extends Partial<ToasterItem> {
  /**
   * A unique identifier for the toast.
   * If not provided, a timestamp will be used to generate one.
   */
  id?: string;
}

export interface ToasterRegister {
  close: (id: string) => void;
  remove: (id: string, e?: MouseEvent<HTMLButtonElement>) => void;
  show: (status: ToasterItem['status'], toast: NewToast) => string;
}

const toasters = new Map<string | undefined, ToasterRegister>();

export const registerToaster = (id: string, handler: ToasterRegister) => {
  toasters.set(id, handler);
};

export const unregisterToaster = (id?: string) => {
  toasters.delete(id);
};

export const getToaster = (id: string) => {
  return toasters.get(id);
};
