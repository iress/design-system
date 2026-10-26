import { IressTable, useResponsiveProps } from '@/main';

export function ResponsiveTableColumns() {
  const { value: columns } = useResponsiveProps({
    base: [{ key: 'name', label: 'Name' }],
    lg: [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
    ],
  });

  return (
    <IressTable
      caption="Responsive columns example"
      columns={columns}
      rows={[
        { name: 'Luke Skywalker', age: 19 },
        { name: 'Princess Leia', age: 19 },
        { name: 'Han Solo', age: 32 },
      ]}
    />
  );
}
