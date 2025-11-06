// TODO: Fix the linting errors in this file.
import {
  type Breakpoints,
  type BreakpointDetail,
} from '@iress-oss/ids-components';
import { use, type JSX } from 'react';
import { IressStorybookContext } from './IressStorybookContext';

export interface CurrentBreakpointProps {
  /**
   * The HTML element or component to render as the wrapper
   */
  as?: keyof JSX.IntrinsicElements;

  /**
   * Custom render function or predefined label types
   */
  renderLabel?:
    | ((props: CurrentBreakpointLabelProps) => React.ReactNode)
    | 'max-width'
    | 'container'
    | 'and-above'
    | 'container-fluid';
}

export interface CurrentBreakpointLabelProps {
  /**
   * The current breakpoint
   */
  breakpoint: Breakpoints;

  /**
   * Details about the current breakpoint
   */
  detail: BreakpointDetail;
}

const ContainerBreakpointLabel = ({
  breakpoint,
  detail,
  fluid = false,
}: {
  breakpoint: CurrentBreakpointLabelProps['breakpoint'];
  detail: CurrentBreakpointLabelProps['detail'];
  fluid?: boolean;
}) => (
  <>
    <p>
      Your screen size is showing the container for the{' '}
      <strong>{String(breakpoint)}</strong> breakpoint.
    </p>

    <ul>
      <li>Screen width range: {detail.screenWidthRange}</li>
      <li>Max width: {fluid ? '100%' : detail.containerMaxWidth}</li>
    </ul>
  </>
);

export const CurrentBreakpoint = ({
  as: Tag = 'span',
  renderLabel,
}: CurrentBreakpointProps) => {
  const { useBreakpoint } = use(IressStorybookContext);
  const { breakpoint, detail } = useBreakpoint() as {
    breakpoint: Breakpoints;
    detail: BreakpointDetail;
  };

  return (
    <Tag>
      {typeof renderLabel === 'function' && renderLabel({ breakpoint, detail })}
      {renderLabel === 'max-width' && (
        <>
          <strong>{String(breakpoint)}</strong> ({detail.maxScreenWidth} and
          above)
        </>
      )}
      {renderLabel === 'container' && (
        <ContainerBreakpointLabel breakpoint={breakpoint} detail={detail} />
      )}
      {renderLabel === 'container-fluid' && (
        <ContainerBreakpointLabel
          breakpoint={breakpoint}
          detail={detail}
          fluid
        />
      )}
      {renderLabel === 'and-above' && (
        <>
          <strong>{String(breakpoint)}</strong> ({detail.minScreenWidth} and
          above)
        </>
      )}
      {!renderLabel && (
        <>
          <strong>{breakpoint}</strong> breakpoint ({detail.screenWidthRange})
        </>
      )}
    </Tag>
  );
};
