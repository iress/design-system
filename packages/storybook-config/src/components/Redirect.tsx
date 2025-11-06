import { use, useEffect } from 'react';
import { IressStorybookContext } from './IressStorybookContext';

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
  if (!to) {
    throw new Error('Redirect component requires a "to" prop');
  }

  const { IressPanel } = use(IressStorybookContext);

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
