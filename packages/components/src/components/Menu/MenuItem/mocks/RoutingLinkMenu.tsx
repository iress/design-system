import { IressMenu, IressMenuItem } from '@/main';
import { HTMLAttributes } from 'react';

/**
 * This could be the `Link` component from `react-router-dom` or any other routing library.
 */
const Link = ({
  to,
  ...restProps
}: Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string }) => (
  <a {...restProps} href={to} />
);

export const RoutingLinkMenu = () => {
  return (
    <IressMenu role="menu" fluid>
      <IressMenuItem element={Link} to="https://iress.com" selected>
        Iress
      </IressMenuItem>
      <IressMenuItem element={Link} to="https://google.com">
        Google
      </IressMenuItem>
    </IressMenu>
  );
};
