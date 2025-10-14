import { useState } from 'react';
import {
  IressButton,
  IressModal,
  IressText,
  IressToasterProvider,
  useToaster,
} from '@/main';
import { AG_THEME_IRESS_ICONS, IressAgGridContainer } from '@iress/ids-themes';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, provideGlobalGridOptions, type ColDef, type ICellRendererParams } from 'ag-grid-community';

import styles from '@iress-storybook/styles.module.scss';

ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: 'legacy' });

const OrderCar = ({ data }: ICellRendererParams) => {
  const [show, setShow] = useState(false);
  const { success } = useToaster();

  return (
    <>
      <IressButton onClick={() => setShow(true)}>Order</IressButton>
      <IressModal show={show} onShowChange={setShow}>
        <IressText>
          <h2>Order a car</h2>
          <p>
            Car: {data.make} {data.model}
          </p>
          <p>
            <IressButton
              onClick={() => {
                success({
                  children: 'Order submitted',
                });
                setShow(false);
              }}
            >
              Submit
            </IressButton>
          </p>
        </IressText>
      </IressModal>
    </>
  );
};

export const AgGridSimple = (args: AgGridReactProps) => {
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef[]>([
    {
      field: 'make',
      filter: true,
      floatingFilter: true,
      flex: 2,
      checkboxSelection: true,
    },
    { field: 'model', flex: 1, autoHeight: true },
    {
      field: 'price',
      flex: 1,
      autoHeight: true,
      valueFormatter: (price) => `$${price.value.toLocaleString()}`,
    },
    { field: 'electric', flex: 1, editable: true, autoHeight: true },
    { field: 'order', flex: 1, cellRenderer: OrderCar },
  ]);

  return (
    <IressToasterProvider>
      <IressAgGridContainer
        alignMiddle
        style={{ height: '300px' }}
      >
        <AgGridReact
          {...args}
          rowData={rowData}
          rowClassRules={{
            [styles.highlightDanger]: (params) => params.data.make === 'Toyota',
          }}
          rowSelection="multiple"
          columnDefs={colDefs}
          icons={AG_THEME_IRESS_ICONS}
          pagination
          paginationPageSize={500}
          paginationPageSizeSelector={[200, 500, 1000]}
        />
      </IressAgGridContainer>
    </IressToasterProvider>
  );
};

export default AgGridSimple;
