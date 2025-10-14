import { IressButton } from '@/main';
import { HTMLAttributes, forwardRef } from 'react';

/**
 * This could be the `Link` component from `react-router-dom` or any other routing library.
 */
const Link = forwardRef<
  HTMLAnchorElement,
  HTMLAttributes<HTMLAnchorElement> & { to: string }
>(({ children, className, to, ...restProps }, ref) => (
  <div className={className}>
    <a href={to} ref={ref} {...restProps}>
      {children}
    </a>
  </div>
));

export const RoutingButton = () => (
  <IressButton element={Link} to="https://iress.com">
    Iress
  </IressButton>
);
