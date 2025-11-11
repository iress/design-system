import { IressText, useResponsiveProps, IressTable } from '@/main';

export const ResponsiveTableColumns = () => {
  const { value } = useResponsiveProps({
    base: [{ key: 'name', label: 'Name' }],
    lg: [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
    ],
  });

  return (
    <IressTable
      caption={
        <IressText textAlign="left">
          <h2>
            <code>useResponsiveProps</code>
          </h2>
          <p>
            This example demonstrates a use case for{' '}
            <code>useResponsiveProps</code>, for changing the columns on a table
            based on the breakpoint.
          </p>
          <p>Resize the screen to see the columns change</p>
        </IressText>
      }
      columns={value}
      rows={[
        { name: 'Luke Skywalker', age: 19 },
        { name: 'Princess Leia', age: 19 },
        { name: 'Han Solo', age: 32 },
      ]}
    />
  );
};
