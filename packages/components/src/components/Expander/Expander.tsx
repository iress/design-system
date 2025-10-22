import { type ReactNode, useEffect, useState } from 'react';
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { useIdIfNeeded } from '@/hooks';
import { expander } from './Expander.styles';
import { css, cx } from '@/styled-system/css';
import { IressText, type IressTextProps } from '../Text';
import { type IressCustomiseSlot } from '@/interfaces';
import { splitCssProps, styled } from '@/styled-system/jsx';
import { GlobalCSSClass } from '@/enums';

export interface IressExpanderProps
  extends Omit<IressTextProps<'div'>, 'element' | 'onChange'> {
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
  const classesRaw = expander.raw({ mode, open: isOpen });

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
          css(classesRaw.activator, styleProps),
        )}
        data-testid={
          activatorStyle?.['data-testid'] ??
          propagateTestid(testid, 'activator')
        }
        onClick={handleActivatorClick}
        type="button"
      >
        {activator}
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
