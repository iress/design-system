import { type FC, type ReactNode, useEffect, useState } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { useIdIfNeeded } from '@/hooks';
import { expander } from './Expander.styles';
import { css, cx } from '@/styled-system/css';
import { IressText, type IressTextProps } from '../Text';
import { type IressCustomiseSlot } from '@/interfaces';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';

/**
 * https://fonts.google.com/icons?selected=Material+Symbols+Rounded:keyboard_arrow_down:FILL@1;wght@300;GRAD@0;opsz@24&icon.style=Rounded&icon.query=keybo&icon.size=24&icon.color=%23e3e3e3&icon.platform=web
 */
const Chevron: FC<{
  className?: string;
}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    className={className}
    aria-hidden="true"
  >
    <path d="M480-372.92q-7.23 0-13.46-2.31t-11.85-7.92L274.92-562.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-442.15l162.92-162.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L505.31-383.15q-5.62 5.61-11.85 7.92-6.23 2.31-13.46 2.31Z" />
  </svg>
);

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
        <Chevron className={classes.chevron} />
      </styled.button>
      <div
        id={`${id}__container`}
        className={classes.container}
        data-testid={propagateTestid(testid, 'container')}
      >
        <div className={classes.containerInner}>
          <IressText className={classes.content} noGutter={noGutter}>
            {children}
          </IressText>
        </div>
      </div>
    </IressText>
  );
};

IressExpander.displayName = 'IressExpander';
