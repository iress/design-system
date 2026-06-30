import { IressTable } from '@/main';

const columnApiRows = [
  { prop: 'key', type: 'string', description: 'Unique key for the column (maps to row data property).' },
  { prop: 'label', type: 'ReactNode', description: 'Label for the column header.' },
  { prop: 'format', type: "'string' | 'number' | 'date' | 'currency' | 'percent' | (value, row) => ReactNode", description: 'Formats cell content. Use built-in formatters or a custom render function.' },
  { prop: 'sort', type: "boolean | 'asc' | 'desc'", description: 'Enable sorting. Set to asc/desc for initial sort direction.' },
  { prop: 'sortFn', type: 'SortingFnOption', description: 'Custom sorting function (TanStack Table API).' },
  { prop: 'filter', type: 'boolean | IressTableColumnFilter', description: 'Enable column filtering with checkbox panel.' },
  { prop: 'width', type: 'string', description: 'Column width (e.g. "200px", "25%").' },
  { prop: 'divider', type: 'boolean', description: 'Render a divider after this column.' },
  { prop: 'noWrap', type: 'boolean', description: 'Prevent text wrapping in cells. Default: true.' },
  { prop: 'currencyCode', type: 'string', description: 'Currency prefix when format is "currency". Default: $.' },
  { prop: 'textAlign', type: "'left' | 'center' | 'right'", description: 'Text alignment for the column.' },
  { prop: 'srOnly', type: 'boolean', description: 'Visually hide the column header (screen reader only).' },
];

export function TableColumnReference() {
  return (
    <IressTable
      caption="IressTableColumn interface"
      hiddenCaption
      compact
      columns={[
        { key: 'prop', label: 'Property', width: '120px' },
        { key: 'type', label: 'Type', width: '200px' },
        { key: 'description', label: 'Description' },
      ]}
      rows={columnApiRows}
    />
  );
}
