import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { IressStack } from '@/components/Stack';
import { IressSkeleton } from '@/components/Skeleton';
import { type IressHTMLAttributes } from '@/interfaces';
import { IressContainer } from '@/components/Container';
import { IressRow } from '@/components/Row';
import { IressCol } from '@/components/Col';
import { IressInline } from '@/components/Inline';
import { IressDivider } from '@/components/Divider';
import { IressCard } from '@/components/Card';
import { IressHide } from '@/components/Hide';
import classNames from 'classnames';
import styles from './PageLoading.module.scss';
import loadingStyles from '../Loading.module.scss';

const PageTemplate = () => (
  <IressContainer>
    <IressRow gutter="lg" verticalAlign="stretch">
      <IressCol>
        <IressStack gutter="md">
          <IressSkeleton textVariant="h2" width="75%" />
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
        <IressStack gutter="md">
          <IressSkeleton textVariant="h2" width="75%" />
          <IressSkeleton mode="rect" height="200px" />
          <IressSkeleton textVariant="body" width="100px" />
        </IressStack>
      </IressCol>
    </IressRow>
  </IressContainer>
);

const DashboardTemplate = () => (
  <IressContainer>
    <IressStack gutter="lg">
      <IressRow horizontalAlign="between" verticalAlign="middle">
        <IressSkeleton textVariant="h1" width="25%" />
        <IressInline gutter="lg">
          <IressSkeleton textVariant="lead" width="200px" />
          <IressSkeleton textVariant="lead" width="200px" />
        </IressInline>
      </IressRow>
      <IressDivider />
      <IressRow gutter="lg">
        <IressCol span="4">
          <IressCard stretch>
            <IressStack gutter="md">
              <IressSkeleton mode="rect" height="300px" />
              <IressSkeleton textVariant="h3" width="75%" />
              <IressSkeleton textVariant="body" width="50%" />
            </IressStack>
          </IressCard>
        </IressCol>
        <IressCol span="4">
          <IressCard stretch>
            <IressStack gutter="md">
              <IressSkeleton mode="rect" height="300px" />
              <IressSkeleton textVariant="h3" width="75%" />
              <IressSkeleton textVariant="body" width="50%" />
            </IressStack>
          </IressCard>
        </IressCol>
        <IressCol span="4">
          <IressCard stretch>
            <IressStack gutter="md">
              <IressSkeleton mode="rect" height="300px" />
              <IressSkeleton textVariant="h3" width="75%" />
              <IressSkeleton textVariant="body" width="50%" />
            </IressStack>
          </IressCard>
        </IressCol>
      </IressRow>
    </IressStack>
  </IressContainer>
);

const templates = {
  page: PageTemplate,
  form: FormTemplate,
  dashboard: DashboardTemplate,
};

export interface PageLoadingProps
  extends Omit<IressHTMLAttributes, 'children'> {
  /**
   * If provided, will switch the skeleton to this template. Use when you have critical content that can be displayed while loading to allow the user to see some content while the rest is loading.
   */
  critical?: ReactNode;

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
  loaded,
  screenReaderText = 'Loading...',
  template = 'page',
  timeout = 500,
  ...restProps
}: PageLoadingProps) => {
  const [show, setShow] = useState(false);
  const [hideTemplate, setHideTemplate] = useState(false);
  const [showCritical, setShowCritical] = useState(false);

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
    <div
      {...restProps}
      className={classNames(className, styles.root, loadingStyles['fade-in'], {
        [loadingStyles['fade-in--active']]: show,
        [styles.hideTemplate]: hideTemplate,
        [styles.showCritical]: showCritical,
      })}
    >
      {!showCritical && <div className={styles.skeleton}>{skeleton}</div>}
      {hideTemplate && <div className={styles.critical}>{critical}</div>}
      <IressHide hiddenOn={{ xs: true }} visuallyHidden>
        {screenReaderText}
      </IressHide>
    </div>
  );
};
