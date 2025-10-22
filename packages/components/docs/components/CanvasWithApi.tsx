import {
  CanvasExtended,
  type CanvasExtendedProps,
} from '@iress-oss/ids-storybook-sandbox';
import { IressExpander, IressPanel } from '@/main';
import { ArgTypes, Controls } from '@storybook/addon-docs/blocks';
import { type ComponentProps } from 'react';

type ControlProps = ComponentProps<typeof Controls>;

interface CanvasWithApiProps extends CanvasExtendedProps, ControlProps {
  /**
   * Make the props read-only in the expander.
   */
  readOnly?: boolean;
}

/**
 * Canvas component that includes an API (props) expander below the canvas.
 */
export const CanvasWithApi = ({
  exclude,
  include,
  of,
  readOnly,
  sort,
  ...props
}: CanvasWithApiProps) => {
  const Table = readOnly ? ArgTypes : Controls;

  return (
    <IressPanel>
      <CanvasExtended of={of as never} {...props} />
      <IressExpander
        activator="Props (API)"
        activatorStyle={{
          textStyle: 'typography.body.md.strong',
          px: 'md',
        }}
        mt="-spacing.900"
        open={props?.sourceState === 'shown'}
      >
        <IressPanel px="xs" my="-spacing.900">
          <Table
            include={include}
            exclude={exclude}
            of={of as never}
            sort={sort}
          />
        </IressPanel>
      </IressExpander>
    </IressPanel>
  );
};
