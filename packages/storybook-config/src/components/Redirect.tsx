import { IressPanel } from '@iress-oss/ids-components';
import { useEffect } from 'react';

interface RedirectProps {
  /**
   * The title to show on the redirect panel
   */
  title?: string;

  /**
   * The URL to redirect to
   */
  to: string;
}

export const Redirect = ({ title, to }: RedirectProps) => {
  useEffect(() => {
    const redirect = window.top ?? window;
    redirect.location.href = to;
  }, [to]);

  return (
    <IressPanel
      bg="colour.neutral.20"
      textAlign="center"
      p="spacing.1200"
      m="spacing.1200"
    >
      <h2>{title ?? 'Redirecting...'}</h2>
      <p>
        If you are not redirected automatically,{' '}
        <a href={to}>follow the link</a>.
      </p>
    </IressPanel>
  );
};
