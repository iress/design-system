import { ReactNode, useEffect, useMemo, useState } from 'react';
import { IressStack } from '@/components/Stack';
import { IressSkeleton } from '@/components/Skeleton';
import { IressContainer } from '@/components/Container';
import { IressRow } from '@/components/Row';
import { IressCol } from '@/components/Col';
import { IressInline } from '@/components/Inline';
import { IressDivider } from '@/components/Divider';
import { IressCard } from '@/components/Card';
import { IressStyledProps } from '@/types';
import { styled } from '@/styled-system/jsx';
import { loading } from '../Loading.styles';
import { cx } from '@/styled-system/css';
import { propagateTestid } from '@/helpers/utility/propagateTestid';

const LoadingCard = () => (
  <IressCol span="4">
    <IressCard
      stretch
      heading={<IressSkeleton textStyle="typography.heading.3" width="75%" />}
      media={<IressSkeleton mode="rect" height="300px" />}
    >
      <IressSkeleton textStyle="typography.body.md" width="50%" />
    </IressCard>
  </IressCol>
);

const PageTemplate = () => (
  <IressContainer>
    <IressRow gutter="lg" verticalAlign="stretch">
      <IressCol>
        <IressStack gap="md">
          <IressSkeleton textStyle="typography.heading.2" width="75%" />
          <IressSkeleton mode="rect" height="200px" />
        </IressStack>
      </IressCol>
    </IressRow>
  </IressContainer>
);

const FormTemplate = () => (
  <IressContainer>
    <IressRow gutter="lg" verticalAlign="stretch">
      <IressCol>
        <IressStack gap="md">
          <IressSkeleton textStyle="typography.heading.2" width="75%" />
          <IressSkeleton mode="rect" height="200px" />
          <IressSkeleton textStyle="typography.body.md" width="100px" />
        </IressStack>
      </IressCol>
    </IressRow>
  </IressContainer>
);

const DashboardTemplate = () => (
  <IressContainer>
    <IressStack gap="lg">
      <IressRow horizontalAlign="between" verticalAlign="middle">
        <IressSkeleton textStyle="typography.heading.1" width="25%" />
        <IressInline gap="lg">
          <IressSkeleton textStyle="typography.body.lg" width="200px" />
          <IressSkeleton textStyle="typography.body.lg" width="200px" />
        </IressInline>
      </IressRow>
      <IressDivider />
      <IressRow gutter="lg">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </IressRow>
    </IressStack>
  </IressContainer>
);

const templates = {
  page: PageTemplate,
  form: FormTemplate,
  dashboard: DashboardTemplate,
};

export interface PageLoadingProps extends Omit<IressStyledProps, 'children'> {
  /**
   * If provided, will switch the skeleton to this template. Use when you have critical content that can be displayed while loading to allow the user to see some content while the rest is loading.
   */
  critical?: ReactNode;

  /**
   * An error to display if the loading fails. This will override the skeleton.
   */
  error?: ReactNode;

  /**
   * If set to `true`, will start hiding the loading indicator. It is recommended to use this prop if you are using the `IressLoading.shouldRender` hook to achieve a smooth loading experience.
   */
  loaded?: boolean;

  /**
   * Use `pattern="page"` for the following use cases:
   * - Detail page for a record
   * - Form page
   * - Article page
   */
  pattern?: 'page';

  /**
   * Only screen readers will see this message.
   * @default 'Loading...'
   */
  screenReaderText?: ReactNode;

  /**
   * Which template to use as the skeleton, or you can use a ReactNode to customise the skeleton completely.
   * @default 'page'
   */
  template?:
    | keyof typeof templates
    | Exclude<ReactNode, string | number | boolean | null>;

  /**
   * Delay in milliseconds before the skeleton is displayed.
   * @default 500
   */
  timeout?: number;
}

export const PageLoading = ({
  className,
  critical,
  error,
  loaded,
  screenReaderText = 'Loading...',
  template = 'page',
  timeout = 500,
  ...restProps
}: PageLoadingProps) => {
  const [show, setShow] = useState(false);
  const [hideTemplate, setHideTemplate] = useState(false);
  const [showCritical, setShowCritical] = useState(false);
  const styles = loading({
    error: !!error,
    pattern: 'page',
    showCritical,
    showIndicator: show && !hideTemplate,
  });

  const skeleton = useMemo(() => {
    if (typeof template === 'string' && template in templates) {
      const Component = templates[template as keyof typeof templates];
      return <Component />;
    }

    return template;
  }, [template]);

  useEffect(() => {
    const showTimeout = setTimeout(() => setShow(true), timeout);

    return () => {
      clearTimeout(showTimeout);
    };
  }, [timeout]);

  useEffect(() => {
    if (loaded === true) {
      setShow(false);
    }
  }, [loaded]);

  useEffect(() => {
    if (!critical) {
      return;
    }

    setHideTemplate(true);
    const showTimeout = setTimeout(() => setShowCritical(true), 200);

    return () => {
      clearTimeout(showTimeout);
    };
  }, [critical]);

  return (
    <styled.div className={cx(className, styles.root)} {...restProps}>
      {error}
      {!error && !showCritical && (
        <div
          className={styles.message}
          data-testid={propagateTestid(restProps['data-testid'], 'skeleton')}
        >
          {skeleton}
        </div>
      )}
      {!error && hideTemplate && (
        <div
          className={styles.critical}
          data-testid={propagateTestid(restProps['data-testid'], 'critical')}
        >
          {critical}
        </div>
      )}
      <styled.div srOnly>{screenReaderText}</styled.div>
    </styled.div>
  );
};
