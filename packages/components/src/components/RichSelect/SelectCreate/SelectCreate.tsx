import { useIdIfNeeded } from '@/hooks';
import { type IressSelectCreateProps } from './SelectCreate.types';
import { IressIcon, IressMenu, IressMenuHeading, IressMenuItem } from '@/main';

export const IressSelectCreate = ({
  fluid = true,
  heading,
  label = 'New option',
  loading,
  onCreate,
  prepend = <IressIcon name="plus" screenreaderText="Add" />,
  ...restProps
}: IressSelectCreateProps) => {
  const id = useIdIfNeeded({ id: restProps.id });
  const labelId = `${id}--label`;
  const hasStringHeading = typeof heading === 'string';

  return (
    <IressMenu
      {...restProps}
      aria-labelledby={
        hasStringHeading ? labelId : restProps['aria-labelledby']
      }
      role="menu"
      fluid={fluid}
    >
      {hasStringHeading ? (
        <IressMenuHeading id={labelId}>{heading}</IressMenuHeading>
      ) : (
        heading
      )}
      <IressMenuItem prepend={prepend} onClick={onCreate} loading={loading}>
        {label}
      </IressMenuItem>
    </IressMenu>
  );
};
