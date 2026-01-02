import { render } from '@testing-library/react';
import { useEffect } from 'react';
import { IressTable } from '..';
import { useTable } from './useTable';

describe('useTable hook', () => {
  const TEST_CAPTION = 'Test Table';
  const TEST_ROWS = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  it('should return table context when used within IressTable', () => {
    let tableContext: ReturnType<typeof useTable> | null = null;

    function TestComponent() {
      const context = useTable();
      useEffect(() => {
        tableContext = context;
      });
      return <div>Test</div>;
    }

    render(
      <IressTable caption={TEST_CAPTION} rows={TEST_ROWS}>
        <TestComponent />
      </IressTable>,
    );

    expect(tableContext).toBeDefined();
    expect(tableContext!.api).toBeDefined();
    expect(tableContext!.getColumnByKey).toBeDefined();
    expect(typeof tableContext!.getColumnByKey).toBe('function');
  });

  it('should provide access to TanStack Table API methods', () => {
    let api: unknown = null;

    function TestComponent() {
      const context = useTable();
      useEffect(() => {
        api = context.api;
      });
      return <div>Test</div>;
    }

    render(
      <IressTable caption={TEST_CAPTION} rows={TEST_ROWS}>
        <TestComponent />
      </IressTable>,
    );

    expect(api).toBeDefined();
    expect(api).toHaveProperty('getRowModel');
    expect(api).toHaveProperty('getHeaderGroups');
    expect(api).toHaveProperty('getAllColumns');
    expect(api).toHaveProperty('getState');
  });

  it('should allow retrieving column configuration by key', () => {
    let foundIdColumn: unknown = null;
    let foundNameColumn: unknown = null;
    let foundNonexistentColumn: unknown = null;

    function TestComponent() {
      const context = useTable();
      const idColumn = context.getColumnByKey('id');
      const nameColumn = context.getColumnByKey('name');
      const nonexistentColumn = context.getColumnByKey('nonexistent');
      useEffect(() => {
        foundIdColumn = idColumn;
        foundNameColumn = nameColumn;
        foundNonexistentColumn = nonexistentColumn;
      });
      return <div>Test</div>;
    }

    render(
      <IressTable
        caption={TEST_CAPTION}
        rows={TEST_ROWS}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name', width: '200px' },
        ]}
      >
        <TestComponent />
      </IressTable>,
    );

    expect(foundIdColumn).toBeDefined();
    expect(foundIdColumn).toMatchObject({ label: 'ID' });

    expect(foundNameColumn).toBeDefined();
    expect(foundNameColumn).toMatchObject({
      label: 'Name',
      width: '200px',
    });

    expect(foundNonexistentColumn).toBeUndefined();
  });

  it('should return undefined when used outside of IressTable context', () => {
    let tableContext: ReturnType<typeof useTable> | null = null;

    function IsolatedTestComponent() {
      const context = useTable();
      useEffect(() => {
        tableContext = context;
      });
      return <div>Isolated Test</div>;
    }

    // This should not throw an error but return undefined context
    render(<IsolatedTestComponent />);

    expect(tableContext).toBeUndefined();
  });
});
