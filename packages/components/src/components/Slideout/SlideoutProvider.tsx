import {
  createContext,
  useCallback,
  useInsertionEffect,
  useMemo,
  useState,
} from 'react';
import {
  type IressSlideoutContextValue,
  type IressSlideoutProviderProps,
} from './Slideout.types';

// TODO: These are duplicated from the SCSS module. We probably need to find a better way to do this.
import pushStyles from './SlideoutPushElement.css?raw';
import { CSS_IDS_VERSION } from '@/constants';
import { querySelectorDeep } from 'query-selector-shadow-dom';

export const IressSlideoutContext = createContext<
  IressSlideoutContextValue | undefined
>(undefined);

let stylesInjected = false;

export const IressSlideoutProvider = ({
  children,
  container,
  injectPushStyles,
}: IressSlideoutProviderProps) => {
  const [opened, setOpened] = useState<string[]>([]);

  const open = useCallback((id: string) => {
    setOpened((prev) => (prev.includes(id) ? [...prev] : [...prev, id]));
  }, []);

  const close = useCallback((id: string) => {
    setOpened((prev) =>
      prev.includes(id) ? prev.filter((modalId) => modalId !== id) : [...prev],
    );
  }, []);

  const showSlideout = useCallback(
    (id: string, flag = true) => {
      if (flag) return open(id);
      close(id);
    },
    [close, open],
  );

  const updatedValue = useMemo(
    () => ({
      container,
      opened,
      showSlideout,
    }),
    [container, opened, showSlideout],
  );

  useInsertionEffect(() => {
    if (!stylesInjected && injectPushStyles) {
      const style = document.createElement('style');
      style.innerHTML = pushStyles.replace(/\\:version\\:/g, CSS_IDS_VERSION);
      style.setAttribute('data-push-element-styles', 'true');
      const target =
        typeof injectPushStyles === 'string'
          ? querySelectorDeep(injectPushStyles)
          : document.head;
      (target ?? document.head).appendChild(style);
      stylesInjected = true;
    }
  }, [injectPushStyles]);

  return (
    <IressSlideoutContext.Provider value={updatedValue}>
      {children}
    </IressSlideoutContext.Provider>
  );
};
