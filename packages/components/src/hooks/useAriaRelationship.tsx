import { useCallback, useRef } from 'react';

export interface AriaRelationshipProps<
  TController extends HTMLElement = HTMLElement,
> {
  setController: (ref: TController | null) => void;
  setControlViaRef: <TControl extends HTMLElement = HTMLElement>(
    controlId: string,
  ) => (element: TControl | null) => void;
}

/**
 * Adjusts the aria attribute of an element,
 * to help screen readers understand the relationship between elements and their controller.
 *
 * @param attribute - The aria attribute to adjust.
 */
export const useAriaRelationship = <
  TController extends HTMLElement = HTMLElement,
>(
  attribute: 'aria-controls' | 'aria-owns',
): AriaRelationshipProps<TController> => {
  const controller = useRef<TController | null>(null);

  const setController = useCallback((ref: TController | null): void => {
    controller.current = ref;
  }, []);

  const addControl = useCallback(
    (controlId: string): void => {
      const ariaRelationship = (
        controller.current?.getAttribute(attribute) ?? ''
      ).split(' ');
      ariaRelationship.push(controlId);

      controller.current?.setAttribute(
        attribute,
        ariaRelationship.join(' ').trim(),
      );
    },
    [attribute],
  );

  const removeControl = useCallback(
    (controlId: string): void => {
      const ariaRelationship = (
        controller.current?.getAttribute(attribute) ?? ''
      )
        .split(' ')
        .filter((id) => id !== controlId);
      controller.current?.setAttribute(
        attribute,
        ariaRelationship.join(' ').trim(),
      );
    },
    [attribute],
  );

  const setControlViaRef = useCallback(
    <TControl extends HTMLElement = HTMLElement>(controlId: string) =>
      (element: TControl | null): void => {
        if (element) {
          addControl?.(controlId);
        } else {
          removeControl?.(controlId);
        }
      },
    [addControl, removeControl],
  );

  return {
    setController,
    setControlViaRef,
  };
};
