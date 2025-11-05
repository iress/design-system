import { type SortType } from '@storybook/addon-docs/blocks';
import { type StoryObj } from '@storybook/react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { IressExpander } from '@iress-oss/ids-components';
import { ComponentApi, type ComponentApiProps } from './ComponentApi';
import {
  ComponentApiHeading,
  type ComponentApiHeadingProps,
} from './ComponentApiHeading';
import { useIsActiveHeading } from '../hooks/useIsActiveHeading';

export interface ComponentApiExpanderProps extends ComponentApiProps {
  className?: string;
  details?: ReactNode;
  exclude?: string[];
  heading?: ComponentApiHeadingProps['children'];
  sort?: SortType;
  story: StoryObj;
}

export const ComponentApiExpander = ({
  heading,
  headingId,
  headingLevel = 2,
  ...restProps
}: ComponentApiExpanderProps) => {
  const headingElement = useRef<HTMLDivElement | null>(null);
  const activeProps = useIsActiveHeading(headingElement);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (activeProps) {
      setShow(true);
    }
  }, [activeProps]);

  return (
    <IressExpander
      activator={
        <ComponentApiHeading
          headingId={headingId}
          headingLevel={headingLevel}
          ref={headingElement}
        >
          {heading}
        </ComponentApiHeading>
      }
      onChange={(open) => setShow(!!open)}
      open={show}
    >
      <ComponentApi {...restProps} heading="" />
    </IressExpander>
  );
};
