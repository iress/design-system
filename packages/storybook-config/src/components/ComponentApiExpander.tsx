import { use, useEffect, useRef, useState } from 'react';
import { ComponentApi, type ComponentApiProps } from './ComponentApi';
import { ComponentApiHeading } from './ComponentApiHeading';
import { useIsActiveHeading } from '../hooks/useIsActiveHeading';
import { IressStorybookContext } from './IressStorybookContext';

/**
 * Component to display the API of a component inside an expander, including controls or arg types.
 * It uses the ComponentApi component inside an IressExpander to allow collapsing and expanding the API section.
 */
export const ComponentApiExpander = ({
  heading,
  headingId,
  headingLevel = 2,
  ...restProps
}: ComponentApiProps) => {
  const { IressExpander, IressText, IressPanel } = use(IressStorybookContext);
  const headingElement = useRef<HTMLDivElement | null>(null);
  const activeProps = useIsActiveHeading(headingElement);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (activeProps) {
      setShow(true);
    }
  }, [activeProps]);

  return (
    <IressPanel
      layerStyle="elevation.raised"
      borderRadius="radius.025"
      py="xs"
      mb="lg"
    >
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
        <IressText pr="xs">
          <ComponentApi {...restProps} heading="" />
        </IressText>
      </IressExpander>
    </IressPanel>
  );
};
