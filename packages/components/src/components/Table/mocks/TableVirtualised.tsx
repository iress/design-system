import { useState } from 'react';
import {
  IressButton,
  IressInline,
  IressPill,
  IressStack,
  IressTable,
  IressText,
  IressToggle,
  type TableColumn,
} from '@/main';

interface Row {
  id: string;
  name: string;
  value: string;
  status: 'pending' | 'approved' | 'rejected';
}

const ROW_COUNT = 1000;

const generateRows = (count: number): Row[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${i}`,
    name: `Item ${i}`,
    value: `Value ${i}`,
    status: 'pending' as const,
  }));

const columns: TableColumn<Row, string>[] = [
  { key: 'name', label: 'Name', width: '35%' },
  { key: 'value', label: 'Value', width: '35%' },
  {
    key: 'status',
    label: 'Status',
    width: '30%',
    format: (value: string) => {
      const modeMap = {
        approved: 'success',
        rejected: 'danger',
      } as const;
      const mode = modeMap[value as keyof typeof modeMap] ?? 'info';
      return <IressPill mode={mode}>{value}</IressPill>;
    },
  },
];

export function TableVirtualised() {
  const [rows, setRows] = useState(() => generateRows(ROW_COUNT));
  const [virtualised, setVirtualised] = useState(true);
  const [lastDuration, setLastDuration] = useState<number | null>(null);

  const updateAll = (status: Row['status']) => {
    const start = performance.now();
    setRows((prev) => prev.map((r) => ({ ...r, status })));
    requestAnimationFrame(() => {
      setLastDuration(Math.round(performance.now() - start));
    });
  };

  return (
    <IressStack gap="md">
      <IressInline gap="sm" verticalAlign="middle">
        <IressToggle
          checked={virtualised}
          onChange={() => setVirtualised((v) => !v)}
        >
          Virtualisation {virtualised ? 'on' : 'off'}
        </IressToggle>
        <IressButton mode="primary" onClick={() => updateAll('approved')}>
          Approve All
        </IressButton>
        <IressButton mode="secondary" onClick={() => updateAll('rejected')}>
          Reject All
        </IressButton>
        <IressButton mode="tertiary" onClick={() => updateAll('pending')}>
          Reset
        </IressButton>
        {lastDuration !== null && (
          <IressText>Last update: {lastDuration}ms</IressText>
        )}
      </IressInline>
      <IressText>
        {ROW_COUNT} rows — toggle virtualisation off to feel the difference.
      </IressText>
      <IressTable
        caption="Virtualisation demo"
        rows={rows}
        columns={columns}
        virtualise={virtualised ? { height: 500 } : undefined}
        compact
      />
    </IressStack>
  );
}
