import { IressButton } from '@/main';
import { type HTMLAttributes, forwardRef } from 'react';

/**
 * This could be the `Link` component from `react-router-dom` or any other routing library.
 */
const Link = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLSpanElement> & { to: string }
>(({ children, className, to, ...restProps }, ref) => (
  <div className={className}>
    <span onClick={() => console.log(to)} ref={ref} {...restProps}>
      {children}
    </span>
  </div>
));

export const RoutingButton = () => (
  <IressButton element={Link} to="https://iress.com">
    Iress
  </IressButton>
);
