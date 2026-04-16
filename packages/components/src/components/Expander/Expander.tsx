import { type ReactNode, useEffect, useRef, useState } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { useIdIfNeeded } from '@/hooks';
import { expander } from './Expander.styles';
import { css, cx } from '@/styled-system/css';
import { IressText, type IressTextProps } from '../Text';
import { type IressCustomiseSlot } from '@/interfaces';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';
import { IressExpanderChevron } from '../ExpanderChevron';

export interface IressExpanderProps extends Omit<
  IressTextProps<'div'>,
  'element' | 'onChange'
> {
  /**
   * The element used to activate the expandable container.
   */
  activator: ReactNode;

  /**
   * This allows you to customise the content styling specifically, which is the floating element.
   * It accepts an object with any of the styling properties available on `IressCSSProps`, as well as `className` and `style`.
   */
  activatorStyle?: IressCustomiseSlot;

  /**
   * Contents that will be expanded/collapsed when the expander is activated.
   */
  children?: ReactNode;

  /**
   * Emitted when the open state changes.
   */
  onChange?: (newValue: boolean) => void;

  /**
   * Controls the display mode of the activator element. Can be Section, Heading or Link.
   */
  mode?: 'section' | 'link';

  /**
   * When true the expandable container will be visible and the activator will display as open.
   */
  open?: boolean;
}

export const IressExpander = ({
  activator,
  activatorStyle = {},
  children,
  className,
  'data-testid': testid,
  onChange,
  id: idProp,
  mode = 'section',
  noGutter,
  open = false,
  ...restProps
}: IressExpanderProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const id = useIdIfNeeded({ id: idProp });
  const containerInnerRef = useRef<HTMLDivElement>(null);
  // Tracks whether this is the first time the effect runs so we can distinguish
  // "already open on mount (no animation)" from "just opened (animation running)".
  const isFirstRenderRef = useRef(true);

  // Manage overflow on containerInner to allow floating children (e.g. an
  // IressSelect dropdown) to render outside the expander bounds once it is open.
  //
  // overflow:hidden is required during the CSS grid animation so content is
  // clipped as the expander collapses.  Once fully open, we switch to
  // overflow:visible; floating-UI then stops treating containerInner as a
  // clipping boundary and can position/size the dropdown correctly.
  //
  // Three cases are handled here:
  //   • Closing: reset overflow immediately before the collapse animation.
  //   • Initial mount with open=true: set visible right away (no animation fires).
  //   • Subsequent opens: handled by onTransitionEnd once the animation finishes.
  useEffect(() => {
    const containerInner = containerInnerRef.current;
    if (!containerInner) return;

    if (!isOpen) {
      // Reset immediately so the collapse animation can clip content correctly.
      containerInner.style.overflow = '';
      isFirstRenderRef.current = false;
      return;
    }

    // On the very first render where open=true there is no animation, so
    // onTransitionEnd will never fire — set visible straight away.
    if (isFirstRenderRef.current) {
      containerInner.style.overflow = 'visible';
    }
    isFirstRenderRef.current = false;
  }, [isOpen]);

  const classes = expander({ mode, open: isOpen });
  const styles = expander.raw({ mode, open: isOpen });

  useEffect((): void => {
    setIsOpen(open);
  }, [open]);

  const handleActivatorClick = (): void => {
    setIsOpen(!isOpen);
    onChange?.(!isOpen);
  };

  const [styleProps, noneStyleProps] = splitCssProps(activatorStyle);

  return (
    <IressText
      className={cx(className, classes.root, GlobalCSSClass.Expander)}
      {...restProps}
      data-testid={testid}
      id={id}
    >
      <styled.button
        {...noneStyleProps}
        aria-expanded={isOpen}
        aria-controls={`${id}__container`}
        className={cx(
          activatorStyle?.className,
          css(styles.activator, styleProps),
          GlobalCSSClass.Group,
        )}
        data-testid={
          activatorStyle?.['data-testid'] ??
          propagateTestid(testid, 'activator')
        }
        onClick={handleActivatorClick}
        type="button"
      >
        {activator}
        <IressExpanderChevron
          open={isOpen}
          inline={mode === 'link'}
          className={classes.chevron}
        />
      </styled.button>
      <div
        id={`${id}__container`}
        className={classes.container}
        data-testid={propagateTestid(testid, 'container')}
        onTransitionEnd={(e) => {
          if (
            e.propertyName === 'grid-template-rows' &&
            containerInnerRef.current
          ) {
            // After the open animation finishes, allow overflow so floating
            // children (e.g. IressSelect dropdowns) can render outside the
            // expander bounds.  Keep it hidden in all other states so the
            // collapse animation clips content correctly.
            containerInnerRef.current.style.overflow = isOpen ? 'visible' : '';
          }
        }}
      >
        <div className={classes.containerInner} ref={containerInnerRef}>
          <IressText className={classes.content} noGutter={noGutter}>
            {children}
          </IressText>
        </div>
      </div>
    </IressText>
  );
};

IressExpander.displayName = 'IressExpander';
