import { IressCard, IressTable } from '@/main';

export function CardWideTable() {
  return (
    <div style={{ width: '400px' }}>
      <IressCard heading={<h2>Wide table</h2>}>
        <IressTable
          caption="Wide table scrolls horizontally within the card"
          rows={[{ a: 'One', b: 'Two', c: 'Three', d: 'Four' }]}
          columns={[
            { key: 'a', label: 'First', width: '300px' },
            { key: 'b', label: 'Second', width: '300px' },
            { key: 'c', label: 'Third', width: '300px' },
            { key: 'd', label: 'Fourth', width: '300px' },
          ]}
        />
      </IressCard>
    </div>
  );
}
