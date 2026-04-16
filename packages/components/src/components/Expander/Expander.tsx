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

  // After the open animation completes, allow children to overflow so that
  // floating elements (e.g. IressSelect dropdown) are not clipped by the
  // overflow:hidden that the grid animation requires.  When closing, reset
  // overflow immediately so the collapse animation works correctly.
  useEffect(() => {
    if (!isOpen && containerInnerRef.current) {
      containerInnerRef.current.style.overflow = '';
    }
  }, [isOpen]);

  // Handle the case where the expander starts open (no animation fires).
  // We run this once on mount so the initial open state is also handled.
  useEffect(() => {
    if (isOpen && containerInnerRef.current) {
      containerInnerRef.current.style.overflow = 'visible';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
